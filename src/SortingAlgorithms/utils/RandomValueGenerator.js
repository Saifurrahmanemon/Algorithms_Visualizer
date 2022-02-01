//this is for generating random numbers in the array
export default function RandomValueGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
