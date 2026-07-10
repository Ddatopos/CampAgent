import QRCode from 'qrcode';

class QRCodeTool {
  async generate(url: string): Promise<string> {
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: '#2D3436',
          light: '#FFFAF0',
        },
      });
      return dataUrl;
    } catch (error) {
      console.error('QR Code 生成失败:', error);
      throw new Error('二维码生成失败');
    }
  }
}

export const qrcodeTool = new QRCodeTool();
