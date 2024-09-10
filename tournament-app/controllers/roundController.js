// controllers/roundController.js

// controllers/roundController.js
const Round = require('../models/Round');
const Contest = require('../models/Contest');
const subRounds = require('../models/subRounds');

exports.createRound = async (req, res) => {
  try {
    const type = req.body.type
if(!type){
  const round = new Round(req.body);
    await round.save();

     // Update the contest with the new round ID
     const contest = await Contest.findById(req.body.contestId);
     if (!contest) {
       return res.status(404).send("Contest not found");
     }
 
     contest.rounds.push(round._id);
     await contest.save();
 
     res.status(201).send(round);
}else if(type === "subRound"){
  const round = new subRounds(req.body);
    await round.save();



    // Update the  SubId with the new round ID
    const round2 = await Round.findById(req.body.roundId);
    if (!round2) {
      return res.status(404).send("round not found");
    }

    round2.SubRounds.push(round._id);
    await round2.save();

    res.status(201).send(round);

}
    
  } catch (error) {  
    res.status(400).send(error.message);
  }
};

exports.getRounds = async (req, res) => {
  try {
    const rounds = await Round.find({contestId:req.params.id}).populate('winners city participants contestId SubRounds');
    res.status(200).send(rounds);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateRound = async (req, res) => {
  try {
    const round = await Round.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(round);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteRound = async (req, res) => {
  try {
    await Round.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Round deleted successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Add participents in subrounds
exports.addParticipantsToSubRound = async (req, res) => {
  try {
    const { contestId, subRoundId, participantIds } = req.body;

    // Find the contest by ID
    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(404).send("Contest not found");
    }

    // Validate the participant IDs
    const validParticipants = contest.participants.filter(participantId => 
      participantIds.includes(participantId.toString())
    );

    if (validParticipants.length === 0) {
      return res.status(400).send("No valid participants found in the contest");
    }

    // Find the subround by ID
    const subRound = await SubRound.findById(subRoundId);
    if (!subRound) {
      return res.status(404).send("Sub-round not found");
    }

    // Add specified participants to the subround
    subRound.participants.push(...validParticipants);

    // Save the subround with updated participants
    await subRound.save();

    res.send("Participants added to sub-round successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.getSubRoundById = async (req, res) => {
  try {
    const round = await subRounds
      .findById(req.params.id)
      .populate({
        path: 'winners',
        select: '-password' // Exclude the password field
      })
      .populate('city', 'name')
      .populate('participants', '_id name');

    if (!round) {
      return res.status(404).json({ status: 'error', message: 'SubRound not found' });
    }

    // Send success response with the found subRound data
    res.status(200).json({ status: 'success', data: round });
  } catch (error) {
    // Handle errors
    res.status(500).json({ status: 'error', message: error.message });
  }
};

