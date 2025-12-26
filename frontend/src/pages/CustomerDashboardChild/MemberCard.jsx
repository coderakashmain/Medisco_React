import { useState } from "react";
import { ChevronDown } from "lucide-react";

const MemberCard = ({ member }) => {
  const [open, setOpen] = useState(false);

  const styles = {
    card: {
      background: "#f3f3f3",
      border: "1px solid var(--color-primary)",
      borderRadius: "10px",
      marginBottom: "14px",
      transition: "all 0.3s ease",
      boxShadow: open
        ? "0 8px 20px rgba(0,0,0,0.08)"
        : "0 3px 10px rgba(0,0,0,0.04)",
    },
    header: {
      padding: "16px 20px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    name: {
      fontSize: "14px",
      fontWeight: 600,
      color: "var(--color-primary)",
    },
    subText: {
      fontSize: "11px",
      color: "#777",
      marginTop: "2px",
    },
    contentWrapper: {
      maxHeight: open ? "400px" : "0px",
      opacity: open ? 1 : 0,
      overflow: "hidden",
      transition: "all 0.4s ease",
    },
    content: {
      padding: "0 20px 16px",
      fontSize: "13px",
      color: "#444",
      borderTop: "1px solid rgba(0,0,0,0.08)",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "10px",
    },
    label: {
      fontWeight: 600,
      color: "var(--color-primary)",
    },
    footer: {
      marginTop: "12px",
      fontSize: "11px",
      color: "#888",
    },
    icon: {
      transition: "transform 0.3s ease",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
    },
  };

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.header} onClick={() => setOpen(!open)}>
        <div>
          <div style={styles.name}>{member.name}</div>
          <div style={styles.subText}>Member ID #{member.id}</div>
        </div>

        <ChevronDown size={18} style={styles.icon} />
      </div>

      {/* Slide Content */}
      <div style={styles.contentWrapper}>
        <div style={styles.content}>
          <div style={styles.row}>
            <span style={styles.label}>DOB</span>
            <span>
              {new Date(member.dob).toLocaleDateString("en-IN")}
            </span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Aadhaar</span>
            <span>
              XXXX XXXX {member.aadhar_no.slice(-4)}
            </span>
          </div>

          <div style={styles.footer}>
            Added on{" "}
            {new Date(member.created_datetime).toLocaleString("en-IN")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
