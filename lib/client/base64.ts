/**
 * Service which is used to convert plain string to base64 string and base64 text into normal string
 */
const base64 = {
  /**
   * Function to convert string to base64 string
   * @param { string } plainText
   * @returns
   */
  encode: (plainText: string) => {
    try {
      const buff = Buffer.from(plainText.toString(), "utf8");
      return buff.toString("base64");
    } catch (err) {
      throw err;
    }
  },
  /**
   * Function to convert base64 string to normal string
   * @param { string } base64Text
   * @returns
   */
  decode: (base64Text: string) => {
    try {
      const buff = Buffer.from(base64Text, "base64");
      return buff.toString("utf-8");
    } catch (err) {
      throw err;
    }
  },
};
export default base64;
