export const parseResponse = (response: string): string => {
    const regex = /"([^"]*)"/;
    const match = response.match(regex);

    if (!match || match.length < 2) {
        throw new Error('invalid post response');
    }
    return match[1];
};

export const parseJSONResponse = (response: string): string => {
    var content = response.replace(/\\n/g, '').replace(/\\t/g, '').replace(/\\"/g, '"');
    let left = 0
    let right = content.length
    while (0 < right && content[right] != "}") right -= 1
    while (left < content.length && content[left] != "{") left += 1
    content = content.substring(left, right + 1);
    return content
}