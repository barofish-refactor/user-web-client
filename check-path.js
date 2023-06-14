/* eslint-disable @typescript-eslint/no-var-requires */
const validPath = require('valid-path');

if (require.main === module) {
  try {
    const homePath = process.cwd().replace(/\\/g, '/');
    const filePathList = process.argv
      .slice(2)
      .map(v => v.replace(new RegExp(`^${homePath}/`, 'g'), ''));
    const result = filePathList
      .map(filePath => {
        const validPathResult = validPath(filePath, { allowGlobPatterns: true });
        if (!validPathResult.valid) {
          return `파일 : ${filePath}\n이유 : ${validPathResult.error}\n`;
        }
        if (/[ㄱ-ㅎ]|[ㅏ-ㅣ]|[가-힣]/.test(filePath.normalize())) {
          return `파일 : ${filePath}\n이유 : 한글이 포함되어있습니다.`;
        }
        if (/ /g.test(filePath)) {
          return `파일 : ${filePath}\n이유 : 공백이 포함되어있습니다.`;
        }
        if (/\x08/g.test(filePath)) {
          return `파일 : ${filePath
            .split('\b')
            .join('(여기)')}\n이유 : 백스페이스 문자가 포함되어있습니다.`;
        }
        return null;
      })
      .filter(v => v !== null);
    if (result.length > 0) {
      console.error(`유효하지 않은 경로/파일이름이 포함되어있습니다.\n${result.join('\n\n')}`);
      process.exit(1);
    }
    process.exit(0);
  } catch (e) {
    console.log('error', e);
    process.exit(1);
  }
}
