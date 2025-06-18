<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{documentTitle}}</title>
    <style>
        /* --- General Body & Font Styling --- */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            font-size: 11pt;
            line-height: 1.5;
            color: #333;
        }

        /* --- Page Layout & Header Simulation --- */
        @page {
            size: A4;
            margin: 1in; 
        }

        body {
            padding-top: 60px; 
            padding-bottom: 40px;
        }
        
        /* --- Page Header with Logo --- */
        .page-header {
            position: fixed;
            top: 0.5in;
            left: 1in;
            right: 1in;
            height: 40px;
            border-bottom: 1px solid #ddd;
            display: flex; /* Use flexbox for easy alignment */
            justify-content: space-between; /* Pushes items to ends */
            align-items: center; /* Vertically centers items */
            font-size: 9pt;
            color: #777;
        }

        .page-header-logo {
            height: 35px; /* Control the size of your logo */
            width: auto;
        }

        .page-footer {
            position: fixed;
            left: 1in;
            right: 1in;
            bottom: 0.5in;
            height: 20px;
            text-align: center;
            font-size: 9pt;
            color: #777;
        }
        
        .page-number::after { content: counter(page); }
        .page-count::after { content: counter(pages); }

        /*
         * --- IMPORTANT: Page Break Control ---
         * This CSS tells the PDF renderer how to handle page breaks
         * to avoid awkwardly splitting content.
        */
        h2, h3 {
            /* Avoid breaking the page right after a heading */
            page-break-after: avoid; 
        }

        table, figure, section, ul, li {
            /* The magic property: avoid breaking elements from the inside */
            page-break-inside: avoid;
        }

        /* --- Content Styling --- */
        main { padding: 0 1in; }
        h1 { color: #1a5faa; font-size: 24pt; text-align: center; }
        h2 { color: #1a5faa; font-size: 16pt; border-bottom: 2px solid #e0e0e0; padding-bottom: 5px; margin-top: 1.5em; }
        p { margin-bottom: 1em; }
        ul { padding-left: 20px; list-style-type: disc; }
        ul ul { list-style-type: circle; margin-top: 0.5em; }
        li { margin-bottom: 0.5em; }

        /* --- Table Styling --- */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1.5em;
        }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        thead { background-color: #f2f2f2; color: #333; font-weight: bold; display: table-header-group; }
        tbody tr:nth-child(even) { background-color: #f9f9f9; }
    </style>
</head>
<body>

    <header class="page-header">
        <img src="{{logoImage}}" alt="Company Logo" class="page-header-logo"/>
        <span>{{surveyTitle}}</span>
    </header>

    <footer class="page-footer">
        Page <span class="page-number"></span> of <span class="page-count"></span>
    </footer>

    <main>
        <h1>{{documentTitle}}</h1>
        <p>{{introduction}}</p>

        {{#each sections}}
        <section>
            <h2>{{title}}</h2>
            {{#if paragraph}}
                <p>{{paragraph}}</p>
            {{/if}}
            {{#if points}}
                <ul>
                    {{#each points}}
                    <li>
                        {{text}}
                        {{#if subpoints}}
                        <ul>
                            {{#each subpoints}}
                            <li>{{this}}</li>
                            {{/each}}
                        </ul>
                        {{/if}}
                    </li>
                    {{/each}}
                </ul>
            {{/if}}
        </section>
        {{/each}}

        <h2>Satisfaction Score Breakdown</h2>
        <table>
            <thead>
                <tr>
                    <th>Feature</th>
                    <th>Score (/10)</th>
                    <th>Change from Q3</th>
                </tr>
            </thead>
            <tbody>
                {{#each satisfactionScores}}
                <tr>
                    <td>{{feature}}</td>
                    <td>{{score}}</td>
                    <td>{{change}}</td>
                </tr>
                {{/each}}
            </tbody>
        </table>
    </main>
</body>
</html>
