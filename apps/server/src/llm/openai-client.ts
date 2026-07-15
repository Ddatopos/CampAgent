import OpenAI from 'openai';

interface LLMConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
}

export const testLLMConnection = async (config: LLMConfig): Promise<{ ok: true } | { ok: false; error: string }> => {
  try {
    const client = new OpenAI({
      baseURL: config.baseUrl,
      apiKey: config.apiKey,
    });

    await client.chat.completions.create({
      model: config.model,
      messages: [{ role: 'user', content: 'test' }],
      max_tokens: 5,
    });

    return { ok: true };
  } catch (error: any) {
    console.error('LLM 连接测试失败:', error);
    const message =
      error?.error?.message ||
      error?.message ||
      '连接测试失败，请检查 Base URL、API Key 和 Model';
    return { ok: false, error: message };
  }
};

export interface LLMCallResult {
  content: string;
  finishReason: string | null;
}

export const callLLM = async (
  config: LLMConfig,
  systemPrompt: string,
  userPrompt: string,
  jsonMode: boolean = false,
  maxTokens: number = 2000
): Promise<LLMCallResult> => {
  const client = new OpenAI({
    baseURL: config.baseUrl,
    apiKey: config.apiKey,
  });
  
  const response = await client.chat.completions.create({
    model: config.model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    response_format: jsonMode ? { type: 'json_object' } : undefined,
    temperature: 0.7,
    max_tokens: maxTokens,
  });

  const choice = response.choices[0];
  return {
    content: choice?.message?.content || '',
    finishReason: choice?.finish_reason ?? null,
  };
};
