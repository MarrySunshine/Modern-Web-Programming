<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <title>鲁厶维的Modern Web Programming作业</title>
    <link rel="stylesheet" href="./index.css"/>
</head>
<body>
    <h1 id="head">作业</h1>
    <div class="dir-container">
    <?php
        $filename = scandir("./");
        for ($i = 0; $i < sizeof($filename); ++$i) {
            if (is_dir($filename[$i]) && $filename[$i][0] != '.') {
                echo '<a href="' . $filename[$i] . '"><p>' . $filename[$i] . "</p></a>";
            }
        }
    ?>
    </div>
</body>
</html>