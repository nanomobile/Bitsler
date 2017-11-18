<?php

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$maxLossesInRowLow = 0;
$maxLossesInRowHigh = 0;

// $serverSeed = "bfd4994b480aeedf08ec2f2a82a3791ea79b45b5affb81d5ef89dee98640269948346edf5f8a354665a4a1a765024e67d0237bea809b34100759ba761f598cb4";
// $clientSeed = "8f7c06e9e48849f38b0a592b5ea5824a5424e331";

// $serverSeed = "f808d5cbc0771fa5f615e811375cbb5d7c234bde2fed050301d7690d266bcd9d699c7ffadef9cea12ce1e7305816ae42f6acad6ee46f3212e7f14d69204dc845";
// $clientSeed = "fba068da0f035a4dfe24ff7841ab52beea8619eb";

// $serverSeed = "6b39dbaf7e0c7c5a08f433549b819b821c016cae39e94ce782fa7f4e9fe88559ddc0e5e338977b7c1ace257aa8b74c52fcdaffafc41e63f69d1fece403385c81";
// $clientSeed = "7a76d2f62fa1a8e4467dfad1c77e0c475e9c446c";

// $serverSeed = "d682586a552bcef00eb9b4bb2619cd26134984b9174b551d4a502496cdec60036b21a1d41597eec0894916ce1da17722b6f8d2b6911e50f6d77e6459439bfb81";
// $clientSeed = "47ae45524c36315c0cffc5d2a941a6e780d40784";

$serverSeed = "5a32b719063f162374dc8b51f79287e2ff32a24fb2a15c8a7dd42c64d8925d3e7b445464a41d0bb5dfa955e7ae38bcd0fc2eb977344e331773fa29f7c632f467";
$clientSeed = "4c5706549174ea31e64bc420f1232981048c29cd";

//$clientSeed = hash("sha512", $serverSeed);

//echo "Hash of Server Seed = " . hash("sha512", $serverSeed) . "<br>_____________________________________________________________________________________________<br>";

$startTime = time();

for ($j = 0; $j <= 0; $j++) {
    $low = 0;
    $high = 0;

    $lossesInRowLow = 0;
    $lossesInRowHigh = 0;

    $tenLow = 0;
    $tenHigh = 0;

    $hundredLow = 0;
    $hundredHigh = 0;

    for ($i=0; $i<=10000000; $i++) {
        //echo $i . "<br>";
        $nonce = $i;
        $seed = $serverSeed.'-'.$clientSeed.'-'.$nonce;
        do {
            $seed = sha1($seed);
            $lucky = hexdec(substr($seed,0,8));
            //echo "NOT FILTERED LUCKY = " . $lucky . "<br>";
        } while ($lucky > 4294960000);
        
        $luckyNumber = ($lucky % 10000) / 100;
        
        if ($luckyNumber < 0)
            $luckyNumber = -$luckyNumber;
        
        //echo "Seed (fulstr) = " . $seed . "<br>";
        //echo "Seed (substr) = " . substr($seed, 0, 8) . "<br>";
        //echo "HexDec = " . $lucky = hexdec(substr($seed, 0, 8)) . "<br>";
        
        //echo "Lucky = " . $luckyNumber . "<br>_____________________________________________________________________________________________<br>";
        
        //echo $luckyNumber . "<br>";  

        // if ($luckyNumber < 10) {
        //     $tenLow++;
        //     if ($luckyNumber < 1) {
        //         $hundredLow++;
        //     }
        // } else if ($luckyNumber > 89.99) {
        //     $tenHigh++;
        //     if ($luckyNumber > 98.99) {
        //         $hundredHigh++;
        //     }
        // }
        
        if ($luckyNumber >= 49.5) {
            $low++;   
            $lossesInRowLow++;
            if ($maxLossesInRowLow < $lossesInRowLow) {
                $maxLossesInRowLow = $lossesInRowLow; 
            }

            if ($luckyNumber > 50.49)
                $lossesInRowHigh = 0;
        }
        
        if ($luckyNumber <= 50.49) {
            $high++;
            $lossesInRowHigh++;
            if ($maxLossesInRowHigh < $lossesInRowHigh) {
                $maxLossesInRowHigh = $lossesInRowHigh; 
            }

            if ($luckyNumber < 49.5)
                $lossesInRowLow = 0;
        }
    }

   // echo "Low = " . $low . "<br>" . "High = " . $high . "<br><br>";

    //echo "Ten Low = " . $tenLow . "<br>" . "Ten High = " . $tenHigh . "<br><br>";

    //echo "Hundred Low = " . $hundredLow . "<br>" . "Hundred High = " . $hundredHigh . "<br><br><br><br><br>";

    $serverSeed = hash("sha512", $serverSeed);
}

echo "Max Losses In Row Low = " . $maxLossesInRowLow . "<br>";
echo "Max Losses In Row High = " . $maxLossesInRowHigh . "<br>";
echo "Time = " . (time() - $startTime);
