import { DEEP_SEEK_API_KEY } from '../mock';

export const rewriteWithDeepSeek = async (params: {
    original: string;
    domain: string;
    style: string;
    requirement: string;
}) => {
    const { original, domain, style, requirement } = params;

    const prompt = `请改写这篇文章。要求：保持原意但优化表达${
        requirement ? `，同时满足以下要求：${requirement}` : ''
    }。改写后的文章：`;

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
                    { role: 'system', content: '你是一名专业的文章改写助手' },
                    { role: 'user', content: `${prompt}\n\n原文：${original}` },
                ],
                temperature: 0.7,
                max_tokens: 2000,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API请求失败');
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('DeepSeek API错误:', error);
        throw error;
    }
};
