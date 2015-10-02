<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>鲁厶维的Modern Web Programming作业</title>
    <link rel="stylesheet" href="index.css"/>
</head>
<body>
    <h1 id="head">作业</h1>
    <?php
        $filename = scandir("./");
        for ($i = 0; $i < sizeof($filename); ++$i) {
            if (is_dir($filename[$i]) && $filename[$i][0] != '.') {
                echo '<a href="' . $filename[$i] . '"><p>' . $filename[$i] . "</p></a><br/>";
            }
        }
    ?>
</body>
</html>