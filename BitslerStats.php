<?php

setlocale(LC_MONETARY, 'en_US');

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// $serverSeed = "bfd4994b480aeedf08ec2f2a82a3791ea79b45b5affb81d5ef89dee98640269948346edf5f8a354665a4a1a765024e67d0237bea809b34100759ba761f598cb4";
// $clientSeed = "8f7c06e9e48849f38b0a592b5ea5824a5424e331";

$serverSeed = "f808d5cbc0771fa5f615e811375cbb5d7c234bde2fed050301d7690d266bcd9d699c7ffadef9cea12ce1e7305816ae42f6acad6ee46f3212e7f14d69204dc845";
$clientSeed = "fba068da0f035a4dfe24ff7841ab52beea8619eb";

// $serverSeed = "6b39dbaf7e0c7c5a08f433549b819b821c016cae39e94ce782fa7f4e9fe88559ddc0e5e338977b7c1ace257aa8b74c52fcdaffafc41e63f69d1fece403385c81";
// $clientSeed = "7a76d2f62fa1a8e4467dfad1c77e0c475e9c446c";

// $serverSeed = "d682586a552bcef00eb9b4bb2619cd26134984b9174b551d4a502496cdec60036b21a1d41597eec0894916ce1da17722b6f8d2b6911e50f6d77e6459439bfb81";
// $clientSeed = "47ae45524c36315c0cffc5d2a941a6e780d40784";

// $serverSeed = "5a32b719063f162374dc8b51f79287e2ff32a24fb2a15c8a7dd42c64d8925d3e7b445464a41d0bb5dfa955e7ae38bcd0fc2eb977344e331773fa29f7c632f467";
// $clientSeed = "4c5706549174ea31e64bc420f1232981048c29cd";

//echo "Hash of Server Seed = " . hash("sha512", $serverSeed) . "<br>_____________________________________________________________________________________________<br>";

$startTime = time();

$serverSeed = hash("sha512", $serverSeed . rand());

for ($j = 0; $j < 1; $j++) {
    $arr = array();
    $chance = 10;
    $win = 0;
    $lose = 0;
    $maxLose = 0;

    for ($nonce = 0; $nonce < 1000000; $nonce++) {
        $seed = $serverSeed.'-'.$clientSeed.'-'.$nonce;
        do {
            $seed = sha1($seed);
            $lucky = hexdec(substr($seed,0,8));
        } while ($lucky > 4294960000);
        
        $luckyNumber = ($lucky % 10000) / 100;
        
        if ($luckyNumber < 0) {
            $luckyNumber = -$luckyNumber;
        }

        // Loose
        if ($luckyNumber >= $chance) {
            $lose++;
        } else { // Win
            $win++;

            if ($lose > 0) {
                $arr[$lose]++;
            }

            if ($lose > $maxLose) {
                $maxLose = $lose;
            }

            $lose = 0;
        }
    }

    // var_dump($arr);

    DumpArray($arr, $maxLose);

    echo "<br><h1>Max Lose = $maxLose</h1><br>";

    $serverSeed = hash("sha512", $serverSeed . rand());
}

echo "<br>Time = " . (time() - $startTime) . "</h2><br>";

function DumpArray($array, $maxLose) {
    for ($i = 0; $i <= $maxLose; $i++) {
        if (0 == $array[$i]) continue;
        echo "<br>$i => " . $array[$i];
    }
}
