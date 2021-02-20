export function getElementId(node$) {
    // Read id from node (only card, status, or board) and convert to int
    return parseInt(node$.attr('id').split('-')[1]);
}