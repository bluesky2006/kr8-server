class ImageService {
  constructor(input) {
    this.input = input;
  }
  //handle null values
  handleImageUpload = () => {
    if (this.input === null) {
      return null;
    }
    if (!this.input) {
      throw new Error('No image data provided');
    }

    if (Buffer.isBuffer(this.input)) {
      return this.input;
    }

    if (this.input instanceof Uint8Array || this.input instanceof ArrayBuffer) {
      return Buffer.from(this.input);
    }

    //handle plain json (get around supertest)
    if (typeof this.input === 'object' && this.input !== null) {
      const values = Object.values(this.input);
      if (values.every((v) => typeof v === 'number')) {
        return Buffer.from(values);
      }
    }
    //handle base 64
    if (typeof this.input === 'string') {
      if (this.input.startsWith('data:image')) {
        const base64Data = this.input.split(',')[1];
        return Buffer.from(base64Data, 'base64');
      }
      return Buffer.from(this.input, 'base64');
    }

    throw new Error('Unsupported image format');
  };
}

module.exports = ImageService;
