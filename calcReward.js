
let userStakeHistory = {
  'addressA': [
    {
      totalStakeIndex: 0,
      userStake: 100,
      userStakeBlock: 0
    },
    {
      totalStakeIndex: 3,
      userStake: 80,
      userStakeBlock: 11
    },
    // {
    //   totalStakeIndex: 7,
    //   userStake: 60,
    //   userStakeBlock: 23
    // }
  ],
  'addressB': [
    {
      totalStakeIndex: 1,
      userStake: 20,
      userStakeBlock: 5
    },
    {
      totalStakeIndex: 4,
      userStake: 60,
      userStakeBlock: 15
    }
  ],
  'addressC': [
    {
      totalStakeIndex: 2,
      userStake: 80,
      userStakeBlock: 7
    },
    {
      totalStakeIndex: 5,
      userStake: 160,
      userStakeBlock: 19
    },
    {
      totalStakeIndex: 6,
      userStake: 80,
      userStakeBlock: 22
    }
  ]
}
var totalStakeAtIndex = [
  { currentTotalStakeIndex: 0, currentTotalStakeBlock: 0, currentTotalStake: 100 },
  { currentTotalStakeIndex: 1, currentTotalStakeBlock: 5, currentTotalStake: 120 },
  { currentTotalStakeIndex: 2, currentTotalStakeBlock: 7, currentTotalStake: 200 },
  { currentTotalStakeIndex: 3, currentTotalStakeBlock: 11, currentTotalStake: 180 },
  { currentTotalStakeIndex: 4, currentTotalStakeBlock: 15, currentTotalStake: 220 },
  { currentTotalStakeIndex: 5, currentTotalStakeBlock: 19, currentTotalStake: 300 },
  { currentTotalStakeIndex: 6, currentTotalStakeBlock: 22, currentTotalStake: 220 },
  //{ currentTotalStakeIndex: 7, currentTotalStakeBlock: 23, currentTotalStake: 200 }
];

var blocksInADay = 6646;
var totalRewardPerDay = 1000000

var currentBlock = 23;
var msg = {
  sender: "addressA"
}
var stakeReward = 0;





var userStakeI = userStakeHistory[msg.sender].length - 1;
var totalStakeI = totalStakeAtIndex.length - 1;

var stakeRatio = 0;
var blocksStakedFor = 0;
var reward = 0;

if(userStakeI >= 0) {
  var calculationCurrentBlock = currentBlock;
  var calculationPreviousBlock = totalStakeAtIndex[totalStakeI].currentTotalStakeBlock;
  var calculationPreviousBlockStake = totalStakeAtIndex[totalStakeI].currentTotalStake;
  var calculationUserStakeBlock = userStakeHistory[msg.sender][userStakeI].userStakeBlock

  //calculate stake from current block to last stake entry
  while (totalStakeI > 0 && calculationPreviousBlock >= calculationUserStakeBlock) {
    //do the stake reward calculation
    stakeRatio = userStakeHistory[msg.sender][userStakeI].userStake / calculationPreviousBlockStake;
    blocksStakedFor = calculationCurrentBlock - calculationPreviousBlock;
    reward = blocksStakedFor/blocksInADay * stakeRatio*totalRewardPerDay;
    stakeReward = stakeReward + reward;

    // console.log(calculationCurrentBlock + "-" + calculationPreviousBlock);
    // console.log(blocksStakedFor);

    calculationCurrentBlock = totalStakeAtIndex[totalStakeI].currentTotalStakeBlock;

    totalStakeI--;

    calculationPreviousBlock = totalStakeAtIndex[totalStakeI].currentTotalStakeBlock;
    calculationPreviousBlockStake = totalStakeAtIndex[totalStakeI].currentTotalStake;
  }
}

console.log(stakeReward);



//
