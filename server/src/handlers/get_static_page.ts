
import { type StaticPage } from '../schema';

export const getStaticPage = async (): Promise<StaticPage> => {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is to serve the static HTML page with a centered red button.
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Red Button Page</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                font-family: Arial, sans-serif;
            }
            .red-button {
                background-color: red;
                border: none;
                width: 100px;
                height: 50px;
                cursor: pointer;
                border-radius: 4px;
            }
            .red-button:hover {
                background-color: darkred;
            }
        </style>
    </head>
    <body>
        <button class="red-button" onclick=""></button>
    </body>
    </html>
    `;
    
    return {
        html,
        contentType: 'text/html'
    };
};
