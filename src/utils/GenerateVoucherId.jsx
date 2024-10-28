function GenerateVoucherId() {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 6);
  return (timestamp + randomPart).toUpperCase();
}

export default GenerateVoucherId;
