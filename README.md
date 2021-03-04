TO use this API:

You can only call methods from this API from telegram,
you must always append all authorization http args
1. Ask this backend for generating MsgGrantAuthorization using GET /generate/:address
2. Broadcast received message to the Terra chain using, for example, Terra Station.
3. confirm broadcasting message on path /confirm/:address.
4. You are ready to vote, to check if your address is able to vote with this backend
use method /has-delegated/:userId
4. 


{ "RESULT": {}}