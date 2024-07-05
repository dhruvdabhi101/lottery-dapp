// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {
    address public owner;
    address[] public participants;
    uint256 public constant ticketPrice = 0.000015 ether;
    bool public lotteryEnded;
    uint256 public numberOfWinners;
    address[] public winners;
    uint256 public lotteryId;
    mapping(address => uint256) public prizeMoney;

    event LotteryEntered(address indexed participant);
    event LotteryEnded(address[] winners, uint256 prizePerWinner);

    constructor(uint256 _numberOfWinners) {
        owner = msg.sender;
        numberOfWinners = _numberOfWinners;
        lotteryId = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function restartLottery() public onlyOwner {
        lotteryEnded = false;
        delete participants;
        delete winners;
    }

    function participate() public payable {
        require(msg.value == ticketPrice, "Incorrect ticket price");
        require(!lotteryEnded, "Lottery has ended");
        participants.push(msg.sender);
        emit LotteryEntered(msg.sender);
    }

    function endLottery() public onlyOwner {
        require(!lotteryEnded, "Lottery has already ended");
        require(participants.length >= numberOfWinners, "Not enough participants");
        lotteryEnded = true;
        selectWinners();
    }

    function selectWinners() private {
        uint256 totalAmount = address(this).balance;
        uint256 prizePerWinner = totalAmount / numberOfWinners;

        for (uint256 i = 0; i < numberOfWinners; i++) {
            uint256 randomIndex = random() % participants.length;
            address winner = participants[randomIndex];
            winners.push(winner);
            prizeMoney[winner] = prizePerWinner;
            payable(winner).transfer(prizePerWinner);

            // Remove the winner from the participants array
            participants[randomIndex] = participants[participants.length - 1];
            participants.pop();
        }
        lotteryId = lotteryId + 1;
        emit LotteryEnded(winners, prizePerWinner);
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participants)));
    }

    function getParticipants() public view returns (address[] memory) {
        return participants;
    }

    function getWinners() public view returns (address[] memory) {
        return winners;
    }

    function getPrizeMoney(address _winner) public view returns (uint256) {
        return prizeMoney[_winner];
    }

    receive() external payable {}
}
