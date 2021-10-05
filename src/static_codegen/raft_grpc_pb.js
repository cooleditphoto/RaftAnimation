// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('@grpc/grpc-js');
var raft_pb = require('./raft_pb.js');

function serialize_AppendEntriesRequest(arg) {
  if (!(arg instanceof raft_pb.AppendEntriesRequest)) {
    throw new Error('Expected argument of type AppendEntriesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AppendEntriesRequest(buffer_arg) {
  return raft_pb.AppendEntriesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AppendEntriesResponse(arg) {
  if (!(arg instanceof raft_pb.AppendEntriesResponse)) {
    throw new Error('Expected argument of type AppendEntriesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AppendEntriesResponse(buffer_arg) {
  return raft_pb.AppendEntriesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_VoteRequest(arg) {
  if (!(arg instanceof raft_pb.VoteRequest)) {
    throw new Error('Expected argument of type VoteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_VoteRequest(buffer_arg) {
  return raft_pb.VoteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_VoteResponse(arg) {
  if (!(arg instanceof raft_pb.VoteResponse)) {
    throw new Error('Expected argument of type VoteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_VoteResponse(buffer_arg) {
  return raft_pb.VoteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var RaftRpcService = exports.RaftRpcService = {
  requestVotes: {
    path: '/RaftRpc/requestVotes',
    requestStream: false,
    responseStream: false,
    requestType: raft_pb.VoteRequest,
    responseType: raft_pb.VoteResponse,
    requestSerialize: serialize_VoteRequest,
    requestDeserialize: deserialize_VoteRequest,
    responseSerialize: serialize_VoteResponse,
    responseDeserialize: deserialize_VoteResponse,
  },
  appendEntries: {
    path: '/RaftRpc/appendEntries',
    requestStream: false,
    responseStream: false,
    requestType: raft_pb.AppendEntriesRequest,
    responseType: raft_pb.AppendEntriesResponse,
    requestSerialize: serialize_AppendEntriesRequest,
    requestDeserialize: deserialize_AppendEntriesRequest,
    responseSerialize: serialize_AppendEntriesResponse,
    responseDeserialize: deserialize_AppendEntriesResponse,
  },
};

exports.RaftRpcClient = grpc.makeGenericClientConstructor(RaftRpcService);
