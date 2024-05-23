import { getIamToken } from '~/server/utils/auth-gpt';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { text, extension } = await readBody(event);

  const token = await getIamToken(config);

  const response_completion = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'x-folder-id': config.YANDEX_FOLDER_ID
    },
    body: JSON.stringify({
      modelUri: `gpt://${config.YANDEX_FOLDER_ID}/yandexgpt`,
      completionOptions: {
        stream: false,
        temperature: 0.2,
        maxTokens: 8000
      },
      messages: [
        {
          role: 'system',
          text: `Ты умный помощник который помогает автодополнить код по выбранному коду ${text} основываясь на расширение файла ${extension}. Предлогай только один вариант автодополнения.`
        },
        {
          role: 'user',
          text
        }
      ]
    })
  });

  const response_completionData = await response_completion.json();
  return response_completionData.result.alternatives[0].message.text;
});