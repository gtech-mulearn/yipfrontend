import { toast } from "react-toastify";

const handleTdDoubleClick = (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, content: string) => {
    event.preventDefault();
    navigator.clipboard.writeText(content)
        .then(() => {

            toast.info('Text copied to clipboard', {
                toastId: 'Copied'
            });
            setTimeout(() => {
                toast.dismiss('Copied')
            }, 1000);
        })
        .catch((error) => {
            console.error('Failed to copy text to clipboard:', error);
        });
};
export default handleTdDoubleClick