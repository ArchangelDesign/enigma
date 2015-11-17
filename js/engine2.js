var i, last_letter, last_bulb, rotor1, rotor2, rotor3, done_settings, duplicate_rotor = 0, loop;
rotor1 = 0;
rotor2 = 0;
rotor3 = 0;
done_settings = 0;
last_letter = 17;
last_bulb = 1;

wheel1 = new Array(26);
wheel2 = new Array(26);
wheel3 = new Array(26);
reflector = new Array(26);
on_bulb = new Array(26);

for(i=0;i<=26;i++){
    on_bulb[i] = new Image();
    on_bulb[i].src = "enigma/" + i + "_on.jpg";
}

letters = new Array(0,10,23,21,12,3,13,14,15,8,16,17,26,25,24,9,18,1,4,11,5,7,22,2,20,19,6);

knock_on2 = new Array(2);
knock_on3 = new Array(2);

rotor = new Array();
rotor[1] = new Array(4,10,12,5,11,6,3,16,21,25,13,19,14,22,24,7,23,20,18,15,0,8,1,17,2,9);
rotor[2] = new Array(0,9,3,10,18,8,17,20,23,1,11,7,22,19,12,2,16,6,25,13,15,24,5,21,14,4);
rotor[3] = new Array(1,3,5,7,9,11,2,15,17,19,23,21,25,13,24,4,8,22,6,0,10,12,20,18,16,14);
rotor[4] = new Array(4,18,14,21,15,25,9,0,24,16,20,8,17,7,23,11,13,5,19,6,10,3,2,12,22,1);
rotor[5] = new Array(21,25,1,17,6,8,19,24,20,15,18,3,13,7,11,23,0,22,12,9,16,14,5,4,2,10);
rotor[6] = new Array(9,15,6,21,14,20,12,5,24,16,1,4,13,7,25,17,3,10,0,18,23,11,8,2,19,22);
rotor[7] = new Array(13,25,9,7,6,17,2,23,12,24,18,22,1,14,20,5,0,8,21,11,15,4,10,16,3,19);
rotor[8] = new Array(5,10,16,7,19,11,23,14,2,1,9,18,15,3,25,17,0,12,4,22,13,8,20,24,6,21);

reflect = new Array();
reflect[1] = new Array(24,17,20,7,16,18,11,3,15,23,13,6,14,10,12,8,4,1,5,25,2,22,21,9,0,19);
reflect[2] = new Array(5,13,15,9,8,0,14,24,4,3,17,25,23,22,6,2,19,10,20,16,18,1,13,12,7,11);
reflect[3] = new Array(4,13,10,16,0,20,24,22,9,8,2,14,15,1,11,12,3,23,25,21,5,19,7,17,6,18);
reflect[4] = new Array(17,3,14,1,9,13,19,10,21,4,7,12,11,5,2,22,25,0,23,6,24,8,15,18,20,18);

knock = new Array();
knock[1] = new Array(18,18);
knock[2] = new Array(6,6);
knock[3] = new Array(23,23);
knock[4] = new Array(11,11);
knock[5] = new Array(1,1);
knock[6] = new Array(1,14);
knock[7] = new Array(1,14);
knock[8] = new Array(1,14);

function change_settings()
{
    if(duplicate_rotor == 1)
    {
        alert("Each rotor can only be used once - please change your settings!");
    }
    else
    {
        rotor1 = document.getElementById("position1").value;
        rotor2 = document.getElementById("position2").value;
        rotor3 = document.getElementById("position3").value;

        for(loop=0;loop<26;loop++)
        {
            wheel1[loop] = rotor[document.getElementById("rotor_one").value][loop];
            wheel2[loop] = rotor[document.getElementById("rotor_two").value][loop];
            wheel3[loop] = rotor[document.getElementById("rotor_three").value][loop];
            reflector[loop] = reflect[document.getElementById("reflector").value][loop];
        }

        for(loop=0;loop<2;loop++)
        {
            knock_on2[loop] = knock[document.getElementById("rotor_two").value][loop];
            knock_on3[loop] = knock[document.getElementById("rotor_three").value][loop];
        }

        done_settings = 1;
        set_rotors();
        document.getElementById("settings").style.display = "None";
    }
}

function check_rotors()
{
    if(document.getElementById("rotor_one").value == document.getElementById("rotor_two").value | document.getElementById("rotor_two").value == document.getElementById("rotor_three").value | document.getElementById("rotor_one").value == document.getElementById("rotor_three").value)
    {
        duplicate_rotor = 1;
    }
    else
    {
        duplicate_rotor = 0;
    }
}

function inverse(wheel, code)
{
    var i;
    i = 0;
    while(wheel[i] != code){
        i++;
    }
    return i;
}

function set_rotors()
{
    document.getElementById("rotor_1").src = "enigma/" + rotor1 + ".jpg";
    document.getElementById("rotor_2").src = "enigma/" + rotor2 + ".jpg";
    document.getElementById("rotor_3").src = "enigma/" + rotor3 + ".jpg";
}

function encypher(letter)
{
    letter = wheel3[(letter + (rotor3 - 1)) % 26];
    letter = wheel2[(letter + (rotor2 - 1)) % 26];
    letter = wheel1[(letter + (rotor1 - 1)) % 26];
    letter = reflector[letter];
    letter = ((inverse(wheel1,letter) - (rotor1 - 1)) + 26) % 26;
    letter = ((inverse(wheel2,letter) - (rotor2 - 1)) + 26) % 26;
    letter = ((inverse(wheel3,letter) - (rotor3 - 1)) + 26) % 26;
    return letter;
}

function lookup(letter)
{
    return letters[letter];
}

function settings()
{
    keyboard[last_bulb + 8].src = "enigma/" + last_letter + "_off.jpg";
    document.getElementById("settings").style.display = "inline-block";
}

function press(key)
{
    if(done_settings)
    {
        rotor3 = (rotor3 % 26) + 1;
        if(rotor3 == knock_on3[0] | rotor3 == knock_on3[1])
        {
            rotor2 = (rotor2 % 26) + 1;

            if(rotor2 == knock_on2[0] | rotor2 == knock_on3[1])
            {
                rotor1 = (rotor1 % 26) + 1;
            }
        }

        document.getElementById("rotor_1").src = "enigma/" + rotor1 + ".jpg";
        document.getElementById("rotor_2").src = "enigma/" + rotor2 + ".jpg";
        document.getElementById("rotor_3").src = "enigma/" + rotor3 + ".jpg";

        letter = encypher(key) + 1;
        bulb = lookup(letter);
        last_bulb = lookup(last_letter);

        keyboard[last_bulb + 8].src = "enigma/" + last_letter + "_off.jpg";
        keyboard[bulb + 8].src = on_bulb[letter].src;
        last_letter = letter;
        last_bulb = bulb;

    }
    else
    {
        alert("You must choose the Enigma settings before coding a message.");
        settings();
    }
}

function show_enigma()
{
    document.getElementById("enigma").style.display = "inline-block";
    settings();
}

function hide()
{
    document.getElementById("enigma").style.display = "none";
    document.getElementById("settings").style.display = "none";
}

function position_divs()
{
    document.getElementById("enigma").style.left = (window.innerWidth - 453)/2 + "px";
    document.getElementById("settings").style.left = (window.innerWidth - 440)/2 + "px";
}
//-->