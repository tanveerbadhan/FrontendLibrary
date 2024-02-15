export interface TextButtonProps {
    /**
   * The text content of the button.
   */
    text: string;

    /**
     * Callback function triggered when the button is clicked.
     */
    onClick: () => void;

    /**
     * The color of the button (optional).
     */
    buttonColor?: string;

    /**
     * The font size of the button (optional).
     */
    fontSize?: string;

    /**
     * A custom CSS class for additional styling (optional).
     */
    customClass?: string;
}