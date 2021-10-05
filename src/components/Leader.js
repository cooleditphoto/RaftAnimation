var messages = require('../static_codegen/raft_pb');
var services = require('../static_codegen/raft_grpc_pb');
var grpc = require('@grpc/grpc-js');

let state = 'follower';
followerIndexList = []
matchIndex = []
lastApplied
commitIndex
timeoutsetting
let currentTerm = 1;
logs = []
let votedFor = 0;
//constants
const ELECTION_TIMEOUT = 300;
function resetElectionTimer() {
    let = randTimeout = ELECTION_TIMEOUT +
        parseInt(Math.random() * ELECTION_TIMEOUT)
    this.electionTimer = setTimeout(() => {
        this.electionTimer = null;
        this.startElection();
    }, this.electionTimeout);
}

function clearElectionTimer() {
    if (this.electionTimer) {
        clearTimeout(this.electionTimer);
        this.electionTimer = null;
    }
}

//start election
function startElection() {
    this.state = 'candidate';
    this.currentTerm++;
    this.votedFor = this.id;
    this.votes = 1;
    resetElectionTimer();
    this.sendRequestVote();
}

function sendRequestVote() {
    let request = new messages.RequestVoteRequest();
    request.setTerm(this.currentTerm);
    request.setCandidateId(this.id);
    request.setLastLogIndex(this.logs.length - 1);
    request.setLastLogTerm(this.logs[this.logs.length - 1].term);
    this.sendRequestVote(request, (err, response) => {
        if (err) {
            console.log(err);
        }else
        {
            if(response.getVoteGranted()){
                this.votes++;
                if(this.votes > this.peers.length/2){
                    this.state = 'leader';
                    this.sendAppendEntries();
                }
            }
        }
    });
}

function appendEntries(call, callback) {
    let request = call.request;
    let response = new messages.AppendEntriesResponse();
    if (request.getTerm() < this.currentTerm) {
        response.setTerm(this.currentTerm);
        response.setSuccess(false);
        callback(null, response);


    } else {
        this.currentTerm = request.getTerm();
        this.state = 'follower';
        this.clearElectionTimer();
        this.resetElectionTimer();
        response.setTerm(this.currentTerm);
        response.setSuccess(true);
        callback(null, response);
    }
}

function sendAppendEntries() {
    let request = new messages.AppendEntriesRequest();
    request.setTerm(this.currentTerm);
    request.setLeaderId(this.id);
    request.setPrevLogIndex(this.logs.length - 1);
    request.setPrevLogTerm(this.logs[this.logs.length - 1].term);
    request.setLeaderCommit(this.commitIndex);
    this.sendAppendEntries(request, (err, response) => {
        if (err) {
            console.log(err);
        }else
        {
            if(response.getSuccess()){
                this.commitIndex = request.getLeaderCommit();
            }
        }
    });
}

function requestVote(call, callback) {
    let request = call.request;
    let response = new messages.RequestVoteResponse();
    if (request.getTerm() < this.currentTerm) {
        response.setTerm(this.currentTerm);
        response.setVoteGranted(false);
        callback(null, response);
    } else {
        this.currentTerm = request.getTerm();
        this.state = 'follower';
        this.clearElectionTimer();
        this.resetElectionTimer();

        response.setTerm(this.currentTerm);
        response.setVoteGranted(true);
        callback(null, response);
    }
}

function becomeLeader() {
    this.state = 'leader';
    this.clearElectionTimer();
    this.sendAppendEntries();
    sendHeartBeat();
}

function sendHeartBeat() {
    let request = new messages.AppendEntriesRequest();
    request.setTerm(this.currentTerm);
    request.setLeaderId(this.id);
    request.setPrevLogIndex(this.logs.length - 1);
    request.setPrevLogTerm(this.logs[this.logs.length - 1].term);
    request.setLeaderCommit(this.commitIndex);
    this.sendAppendEntries(request, (err, response) => {
        if (err) {
            console.log(err);
        }else
        {
            if(response.getSuccess()){
                this.commitIndex = request.getLeaderCommit();
            }
        }
    });
}

function becomeFollower(term) {
    this.state = 'follower';
    this.currentTerm = term
  this.votedFor = -1
    this.clearElectionTimer();
    this.resetElectionTimer();
}



/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
    var server = new grpc.Server();
    server.addService(services.RaftRpcService, { appendEntries: appendEntries }, { requestVotes: requestVotes });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main();


class Leader extends React.Component {
    //RaftProto.VoteResponse requestVote(RaftProto.VoteRequest request);

    // RaftProto.AppendEntriesResponse appendEntries(RaftProto.AppendEntriesRequest request);


    rpcFromClient() {
        entrie = [];
        this.appendEntriesRPC(term,)
    }
    //heartbeat&requests
    appendEntriesRPC(term, leaderId, prevLogIndex, prevTerm, entries, leaderCommit) {
        if (term < this.currentTerm) {
            return false;
        }

    }
    //conversion to candidate
    convertToCandidate() {
        this.currentTerm++;
        this.votedFor =
            this.timeoutsetting = 0;
        //
        this.requestVotesRPC
    }
    requestVotesRPC(term, candidateId, lastLogIndex, lastLogTerm) {
        if (term < this.currentTerm) {
            return false;
        }
        if (!this.votedFor || !candidateId) {
            if (lastLogTerm >= this.currentTerm && lastLogIndex >= this.commitIndex) {
                return true;
            }
        }
    }
}

exports.getServer = getServer;
