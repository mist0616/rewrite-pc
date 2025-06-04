import { DEEP_SEEK_API_KEY } from '../mock';

// 领域映射
const domainMap: Record<string, string> = {
    ti_yu: '体育',
    // 其他领域...
};

// 风格描述映射
const styleDescriptionMap: Record<string, string> = {
    normal: '标准新闻报道风格',
    mi_meng: '客观事实构建争议性视角',
    // 其他风格...
};

export const rewriteWithDeepSeek = async (params: {
    original: string;
    domain: string;
    style: string;
    requirement: string;
}) => {
    const { original, domain, style, requirement } = params;

    // 获取领域和风格描述
    const domainLabel = domainMap[domain] || '';
    const styleDescription = styleDescriptionMap[style] || '';

    // 优化后的提示词
    const prompt = [
        '## 深度内容重构任务',
        '你是一名专业的内容重构专家，需要根据以下要求对原文进行深度重构创作：',
        '',
        '### 核心任务',
        '1. 事实提取：识别并提取核心事实、关键数据和独特观点',
        '2. 爆点挖掘：找出最具传播潜力的1-3个爆点元素',
        '3. 标题创作：设计三段式标题（25-30字），反映真实内容',
        '4. 内容重构：基于爆点元素创作全新文章，相似度<30%',
        '',
        '### 重构要求',
        ...(domainLabel ? [`- 领域：${domainLabel}`] : []),
        ...(styleDescription ? [`- 风格：${styleDescription}`] : []),
        ...(requirement ? [`- 特殊要求：${requirement}`] : []),
        '- 标题规范：三段式结构，25-30字，不夸张不标题党',
        '- 事实准确：100%基于原文事实，禁止添加虚构内容',
        '- 语言客观：避免使用"震惊""重磅"等夸张形容词',
        '- 避免使用原文的句子结构和表达顺序',
        '- 使用不同的论证逻辑和案例组织方式',
        '',
        '输出格式：',
        '标题：[生成的三段式标题]',
        '内容：[重构后的完整文章内容]',
        '',
        '### 原文内容',
        original,
    ].join('\n');

    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${DEEP_SEEK_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    {
                        role: 'system',
                        content: ['请参考咪蒙的文章风格，润色这篇文章'].join('\n'),
                    },
                    { role: 'user', content: prompt },
                ],
                temperature: 0.7,
                max_tokens: 2500,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API请求失败');
        }

        const data = await response.json();
        const rawOutput = data.choices[0].message.content.trim();

        // 解析标题和内容
        return parseOutput(rawOutput);
    } catch (error) {
        console.error('DeepSeek API错误:', error);
        throw new Error(`内容重构失败: ${error.message}`);
    }
};

// 解析输出内容的辅助函数
function parseOutput(rawOutput: string): { title: string; content: string } {
    // 尝试匹配标准格式
    const titleMatch = rawOutput.match(/标题：([^\n]+)/);
    const contentMatch = rawOutput.match(/内容：([\s\S]*)/);

    if (titleMatch && contentMatch) {
        return {
            title: titleMatch[1].trim(),
            content: contentMatch[1].trim(),
        };
    }

    // 尝试其他常见格式
    const alternativeMatch = rawOutput.match(/(.*?)\n\n([\s\S]*)/);
    if (alternativeMatch) {
        return {
            title: alternativeMatch[1].trim(),
            content: alternativeMatch[2].trim(),
        };
    }

    // 默认返回原始文本作为内容
    return {
        title: '原标题',
        content: rawOutput,
    };
}
