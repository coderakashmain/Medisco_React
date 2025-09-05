import React from 'react'
import { formatDistanceToNow } from "date-fns";

const TimeAgo = ({dateString}) => {
  const formatted = formatDistanceToNow(new Date(dateString), { addSuffix: true });
  return <span>{formatted}</span>;
}

export default TimeAgo
