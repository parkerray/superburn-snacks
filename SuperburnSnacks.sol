/*

███████ ██    ██ ██████  ███████ ██████  ██████  ██    ██ ██████  ███    ██ 
██      ██    ██ ██   ██ ██      ██   ██ ██   ██ ██    ██ ██   ██ ████   ██ 
███████ ██    ██ ██████  █████   ██████  ██████  ██    ██ ██████  ██ ██  ██ 
     ██ ██    ██ ██      ██      ██   ██ ██   ██ ██    ██ ██   ██ ██  ██ ██ 
███████  ██████  ██      ███████ ██   ██ ██████   ██████  ██   ██ ██   ████ 
                                                                            
                                                                            
███████ ███    ██  █████   ██████ ██   ██ ███████                           
██      ████   ██ ██   ██ ██      ██  ██  ██                                
███████ ██ ██  ██ ███████ ██      █████   ███████                           
     ██ ██  ██ ██ ██   ██ ██      ██  ██       ██                           
███████ ██   ████ ██   ██  ██████ ██   ██ ███████                           

*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SuperburnSnacks is ERC721A, Ownable {
    constructor() ERC721A("Superburn Snacks", "SNACKS") {}

    // converts a uint to a string
    function uint2str(
        uint _i
    ) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    // gets the seconds until a block timestamp
    function secondsRemaining(uint end) internal view returns (uint) {
        if (block.timestamp <= end) {
            return end - block.timestamp;
        } else {
            return 0;
        }
    }

    // gets the minutes until a block timestamp
    function minutesRemaining(uint end) internal view returns (uint) {
        if (secondsRemaining(end) >= 60) {
            return (end - block.timestamp) / 60;
        } else {
            return 0;
        }
    }
}