export const errorFilter = (error: string) => {
  const errorMessage = error
    .replace(/.*\((.*)\).*/, "$1")
    .replace(/-/g, " ")
    .replace(/auth\//, "")
    .trim();
  return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
};

export const shortenProductName = (name: string): string => {
  const words = name.split(" ");
  let shortName = words.slice(0, 3).join(" ");

  if (shortName.length > 50) {
    shortName = shortName.slice(0, 12) + "...";
  }

  return shortName;
};

export const formatTextWithLineBreaks = (text: string, wordsPerLine = 3) => {
  // Handle empty or null text
  if (!text) return "";

  // Split the text into words
  const words = text.split(" ");

  // Initialize result array
  const lines = [];

  // Process words in chunks of wordsPerLine
  for (let i = 0; i < words.length; i += wordsPerLine) {
    // Get current chunk of words (up to wordsPerLine)
    const chunk = words.slice(i, i + wordsPerLine);

    // Join the chunk back into a line
    lines.push(chunk.join(" "));
  }

  // Join all lines with line breaks
  return lines.join("\n");
};

export const getRandomColor = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to RGB values
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;

  // Ensure colors are not too dark or too light
  const adjustedColor = `rgb(${(r % 128) + 80}, ${(g % 128) + 80}, ${
    (b % 128) + 80
  })`;

  return adjustedColor;
};
