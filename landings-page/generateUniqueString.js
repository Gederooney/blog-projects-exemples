function generateUniqueStrings(desiredCount) {
  // Calculate the minimum length of strings needed to get the desiredCount of unique combinations
  let minLength = 2 // Start with a minimum length of 2
  while (Math.pow(26, minLength) < desiredCount) {
    minLength++
  }

  const uniqueStrings = new Set()
  const possibleChars = 'abcdefghijklmnopqrstuvwxyz'

  // Helper function to generate a random string of a given length
  function getRandomString(length) {
    let result = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * possibleChars.length)
      result += possibleChars[randomIndex]
    }
    return result
  }

  // Generate unique strings until we reach the desired count
  while (uniqueStrings.size < desiredCount) {
    const randomString = getRandomString(minLength)
    uniqueStrings.add(randomString)
  }

  return Array.from(uniqueStrings)
}
