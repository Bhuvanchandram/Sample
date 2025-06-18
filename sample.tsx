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
            /* Top/Bottom margin 1in, Left/Right margin 0.5in */
            margin: 1in 0.5in;
        }

        body {
            /* Keep padding for header/footer space */
            padding-top: 60px; 
            padding-bottom: 40px;
        }
        
        /* --- Page Header with Logo --- */
        .page-header {
            position: fixed;
            top: 0.5in;
            /* Match the new page margins */
            left: 0.5in;
            right: 0.5in;
            height: 40px;
            border-bottom: 1px solid #ddd;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 9pt;
            color: #777;
        }

        .page-header-logo {
            height: 35px;
            width: auto;
        }

        .page-footer {
            position: fixed;
            /* Match the new page margins */
            left: 0.5in;
            right: 0.5in;
            bottom: 0.5in;
            height: 20px;
            text-align: center;
            font-size: 9pt;
            color: #777;
        }
        
        .page-number::after { content: counter(page); }
        .page-count::after { content: counter(pages); }

        /* --- Page Break Control --- */
        h2, h3 {
            page-break-after: avoid; 
        }

        table, figure, section, ul, li {
            page-break-inside: avoid;
        }

        /* --- Content Styling --- */
        /* main padding is no longer needed as the @page margin handles it */
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
