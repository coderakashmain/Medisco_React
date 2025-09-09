  const sliceText = (text, maxLength = 30) => {
    if(!text) return;
    const plainText = text.replace(/<[^>]+>/g, "");
    if (plainText.length > maxLength) {
      return plainText.slice(0, maxLength) + "...";
    } else {
      return plainText;
    }
  }

  export default sliceText;