/**

 Archangel Design Enigma Simulator v1.0
 ======================================

 @author Rafal Martinez-Marjanski
 www.archangel-design.com

 **/

var ENIGMA = ENIGMA ||
    {};

ENIGMA.log = function(text) {
    console.log(text);
};

ENIGMA.error = function(text) {
    console.log("ERROR: "+text);
};

ENIGMA.invertRotor = function swap(rotor){
    var ret = {};
    for(var key in rotor){
        ret[rotor[key]] = key;
    }
    return ret;
};

ENIGMA.getRotorTrigger = function(type, position) {
    switch (type) {
        case 'I':
            if (position == 'Q') {
                return true;
            }
            break;
        case 'II':
            if (position == 'E') {
                return true;
            }
            break;
    }
};

ENIGMA.letterToPosition = function (letter) {
    positionTable = {
        'A' : 1,
        'B' : 2,
        'C' : 3,
        'D' : 4,
        'E' : 5,
        'F' : 6,
        'G' : 7,
        'H' : 8,
        'I' : 9,
        'J' : 10,
        'K' : 11,
        'L' : 12,
        'M' : 13,
        'N' : 14,
        'O' : 15,
        'P' : 16,
        'Q' : 17,
        'R' : 18,
        'S' : 19,
        'T' : 20,
        'U' : 21,
        'V' : 22,
        'W' : 23,
        'X' : 24,
        'Y' : 25,
        'Z' : 26
    };
    return positionTable[letter];
};

ENIGMA.letterToPosition2 = function (letter, rotor) {
    var i = 1;
    for(var key in rotor) {
        if (key == letter) {
            return i;
        }
        i++;
    }
    if (i > 100) {return;}
    return i;
};

ENIGMA.positionToLetter2 = function(letter, rotor) {
    var i = 1;
    for(var key in rotor) {
        if (i == letter) {
            return key;
        }
        i++;
    }
    if (i > 100) {return;}
    return i;

}

ENIGMA.positionToLetter = function (position) {
    positionTable = {
        1 : 'A',
        2 : 'B',
        3 : 'C',
        4 : 'D',
        5 : 'E',
        6 : 'F',
        7 : 'G',
        8 : 'H',
        9 : 'I',
        10 : 'J',
        11 : 'K',
        12 : 'L',
        13 : 'M',
        14 : 'N',
        15 : 'O',
        16 : 'P',
        17 : 'Q',
        18 : 'R',
        19 : 'S',
        20 : 'T',
        21 : 'U',
        22 : 'V',
        23 : 'W',
        24 : 'X',
        25 : 'Y',
        26 : 'Z'
    };
    return positionTable[position];

};

ENIGMA.getRotorConnections = function(type) {
    rotorI = {
        'A' : 'E',
        'B' : 'K',
        'C' : 'M',
        'D' : 'F',
        'E' : 'L',
        'F' : 'G',
        'G' : 'D',
        'H' : 'Q',
        'I' : 'V',
        'J' : 'Z',
        'K' : 'N',
        'L' : 'T',
        'M' : 'O',
        'N' : 'W',
        'O' : 'Y',
        'P' : 'H',
        'Q' : 'X',
        'R' : 'U',
        'S' : 'S',
        'T' : 'P',
        'U' : 'A',
        'V' : 'I',
        'W' : 'B',
        'X' : 'R',
        'Y' : 'C',
        'Z' : 'J'
    };

    rotorII = {
        'A' : 'E',
        'B' : 'K',
        'C' : 'M',
        'D' : 'F',
        'E' : 'L',
        'F' : 'G',
        'G' : 'D',
        'H' : 'Q',
        'I' : 'V',
        'J' : 'Z',
        'K' : 'N',
        'L' : 'T',
        'M' : 'O',
        'N' : 'W',
        'O' : 'Y',
        'P' : 'H',
        'Q' : 'X',
        'R' : 'U',
        'S' : 'S',
        'T' : 'P',
        'U' : 'A',
        'V' : 'I',
        'W' : 'B',
        'X' : 'R',
        'Y' : 'C',
        'Z' : 'J'
    };

    rotorIII = {
        'A' : 'E',
        'B' : 'K',
        'C' : 'M',
        'D' : 'F',
        'E' : 'L',
        'F' : 'G',
        'G' : 'D',
        'H' : 'Q',
        'I' : 'V',
        'J' : 'Z',
        'K' : 'N',
        'L' : 'T',
        'M' : 'O',
        'N' : 'W',
        'O' : 'Y',
        'P' : 'H',
        'Q' : 'X',
        'R' : 'U',
        'S' : 'S',
        'T' : 'P',
        'U' : 'A',
        'V' : 'I',
        'W' : 'B',
        'X' : 'R',
        'Y' : 'C',
        'Z' : 'J'
    };

    switch (type) {
      case 'I': return rotorI;
      case 'II': return rotorII;
      case 'III' : return rotorIII;
    }
    return rotorI;
};

ENIGMA.RotorEncryptor = function(type, position, offset, letter, invert)
{
    rotor = ENIGMA.getRotorConnections(type);

    invertedRotor = ENIGMA.invertRotor(rotor);

    rotorPosition = ENIGMA.letterToPosition(position);

    if (invert) {
        letterPosition = ENIGMA.letterToPosition2(letter, invertedRotor);
    } else {
        letterPosition = ENIGMA.letterToPosition(letter);
    }
    if (invert) {
        v = Math.abs(letterPosition - (rotorPosition - 1));
        encryptionPoint = v % 26;
        letterToEncrypt = ENIGMA.positionToLetter2(encryptionPoint, invertedRotor);
    } else {
        encryptionPoint = ((rotorPosition - 1) + letterPosition) % 26;
        letterToEncrypt = ENIGMA.positionToLetter(encryptionPoint);
    }

    if (!invert) {
        return rotor[letterToEncrypt];
    } else {
        return invertedRotor[letterToEncrypt];
    }
};

ENIGMA.reflector = function(letter) {
    reflectorB = {
        'A' : 'Y',
        'B' : 'R',
        'C' : 'U',
        'D' : 'H',
        'E' : 'Q',
        'F' : 'S',
        'G' : 'L',
        'H' : 'D',
        'I' : 'P',
        'J' : 'X',
        'K' : 'N',
        'L' : 'G',
        'M' : 'O',
        'N' : 'K',
        'O' : 'M',
        'P' : 'I',
        'Q' : 'E',
        'R' : 'B',
        'S' : 'F',
        'T' : 'Z',
        'U' : 'C',
        'V' : 'W',
        'W' : 'V',
        'X' : 'J',
        'Y' : 'A',
        'Z' : 'T'
    };

    return reflectorB[letter];
};

ENIGMA.Rotor = function (type)
{
    this.position = 'A';
    this.type = type;
    this.offset = 0;


    this.step = function () {
      var result = false;
      if (ENIGMA.getRotorTrigger(this.type, this.position)) {
          result = true;
      }
        currentPos = ENIGMA.letterToPosition(this.position);
        if (currentPos == 26) {
            currentPos = 1;
        } else {
            currentPos++;
        }
        this.position = ENIGMA.positionToLetter(currentPos);
        return result;
    };

    this.setPosition = function (position) {
        if (!this.isValidPosition(position)) {
            ENIGMA.error("position "+position+" is not a valid rotor position");
            return;
        }
        this.position = position;
    };

    this.isValidPosition = function (position) {
        if (position.length != 1) {
            return false;
        }
        if (position.match(/[A-Z]/g) == null) {
            return false;
        }
        return true;
    };

    this.encrypt = function (letter) {
        return ENIGMA.RotorEncryptor(this.type, this.position, this.offset, letter, false);
    };

    this.decrypt = function (letter) {
        return ENIGMA.RotorEncryptor(this.type, this.position, this.offset, letter, true);
    }
};


ENIGMA.M3Machine = function(rotor1, rotor2, rotor3, reflector) {
  rotor1 = new ENIGMA.Rotor(rotor1);
  rotor2 = new ENIGMA.Rotor(rotor2);
  rotor3 = new ENIGMA.Rotor(rotor3);

  this.setRotorsPosition = function(a, b, c) {
    this.rotor1.setPosition(a);
    this.rotor2.setPosition(b);
    this.rotor3.setPosition(c);
  }

  this.encrypt = function(letter) {
    if (this.rotor1.step()) {
      if (this.rotor2.step()) {
        this.rotor3.step();
      }
    }
    l = this.rotor1.encrypt(letter);
    l = this.rotor2.encrypt(l);
    l = this.rotor3.encrypt(l);
    l = ENIGMA.reflector(l);
    l = this.rotor3.decrypt(l);
    l = this.rotor2.decrypt(l);
    l = this.rotor1.decrypt(l);
    return l;
  }
}
