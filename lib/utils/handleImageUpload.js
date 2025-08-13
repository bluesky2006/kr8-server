const handleImageUpload = (uint8Array) => {
  if (!uint8Array) {
    return 'error uploading image';
  }
  return Buffer.from(uint8Array);
};

module.exports = { handleImageUpload };
