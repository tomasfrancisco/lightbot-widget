import axios from "axios";

const HOST = process.env.REACT_APP_AGENT_HOST;

export const getAgents = () => axios.get(`${HOST}/agents`);

export const getAgentData = (agentId: string) =>
  axios.get(`${HOST}/agent-data?lightbot_agent_id=${agentId}`);

export const startChat = (sessionId: string, agentId: string) =>
  axios.post(`${HOST}/start`, {
    lightbot_agent_id: agentId,
    session_id: sessionId,
  });

export const sendMessage = (userId: string, sessionId: string, agentId: string, message: string) =>
  axios.post(`${HOST}`, {
    human: message,
    lightbot_agent_id: agentId,
    session_id: sessionId,
    user_id: userId,
  });

export const sendEvent = (userId: string, sessionId: string, agentId: string, event: string) =>
  axios.post(`${HOST}/jump`, {
    event,
    lightbot_agent_id: agentId,
    session_id: sessionId,
    user_id: userId,
  });

export const sendFeedback = (
  sessionId: string,
  agentId: string,
  feedback: string,
  transcript: any,
) =>
  axios.post(`${HOST}/feedback`, {
    feedback,
    lightbot_agent_id: agentId,
    session_id: sessionId,
    transcript: { value: JSON.stringify(transcript) },
  });
