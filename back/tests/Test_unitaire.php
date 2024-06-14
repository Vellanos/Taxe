<?php

function validateRegulationNumber($regNum) {
    $pattern = '/^([A-Z])([A-Z])(\d{4})_(\d{1,2})_(\d{1,2})$/';
    if (!preg_match($pattern, $regNum, $matches)) {
        return false;
    }

    list(, $letter1, $letter2, $year, $num1, $num2) = $matches;

    if ($letter1 >= $letter2) {
        return false;
    }

    $currentYear = date("Y");
    if ((int)$year != $currentYear) {
        return false;
    }

    if ((int)$num1 + (int)$num2 != 100) {
        return false;
    }

    return true;
}

function luhnAlgorithm($cardNumber) {
    $total = 0;
    $reverseDigits = strrev($cardNumber);

    for ($i = 0; $i < strlen($reverseDigits); $i++) {
        $n = (int)$reverseDigits[$i];
        if ($i % 2 == 1) {
            $n *= 2;
            if ($n > 9) {
                $n -= 9;
            }
        }
        $total += $n;
    }

    return $total % 10 == 0;
}


$validRegulationNumber = "KW2024_22_78";
$invalidRegulationNumberLetters = "WK2024_22_78";
$invalidRegulationNumberDate = "KW2000_22_78";
$invalidRegulationNumberSum = "KW2024_22_55";

$validCardNumber = "4532015112830366";
$invalidCardNumber = "4532015112830365";

echo "Valid regulation number ($validRegulationNumber): " . (validateRegulationNumber($validRegulationNumber) ? 'True' : 'False') . "\n";
echo "Invalid regulation number letters ($invalidRegulationNumberLetters): " . (validateRegulationNumber($invalidRegulationNumberLetters) ? 'True' : 'False') . "\n";
echo "Invalid regulation number date ($invalidRegulationNumberDate): " . (validateRegulationNumber($invalidRegulationNumberDate) ? 'True' : 'False') . "\n";
echo "Invalid regulation number sum ($invalidRegulationNumberSum): " . (validateRegulationNumber($invalidRegulationNumberSum) ? 'True' : 'False') . "\n";

echo "Valid card numbers ($validCardNumber): " . (luhnAlgorithm($validCardNumber) ? 'True' : 'False') . "\n";
echo "Invalid card numbers ($invalidCardNumber): " . (luhnAlgorithm($invalidCardNumber) ? 'True' : 'False') . "\n";
