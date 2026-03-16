import { Button } from "@/components/ui/button";
import { Award, Download } from "lucide-react";

interface Props {
  studentName: string;
  courseName: string;
  instructorName: string;
}

const CourseCertificate = ({ studentName, courseName, instructorName }: Props) => {
  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 850;
    const ctx = canvas.getContext("2d")!;

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1200, 850);

    // Border
    ctx.strokeStyle = "#6366f1";
    ctx.lineWidth = 8;
    ctx.strokeRect(30, 30, 1140, 790);
    ctx.strokeStyle = "#e0e7ff";
    ctx.lineWidth = 2;
    ctx.strokeRect(45, 45, 1110, 760);

    // Header decoration
    ctx.fillStyle = "#6366f1";
    ctx.fillRect(100, 80, 1000, 4);

    // Title
    ctx.fillStyle = "#6366f1";
    ctx.font = "bold 18px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("LEARNHUB", 600, 130);

    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 42px Georgia, serif";
    ctx.fillText("Certificate of Completion", 600, 200);

    // Divider
    ctx.fillStyle = "#6366f1";
    ctx.fillRect(450, 220, 300, 3);

    // Body
    ctx.fillStyle = "#64748b";
    ctx.font = "18px Arial, sans-serif";
    ctx.fillText("This is to certify that", 600, 290);

    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 36px Georgia, serif";
    ctx.fillText(studentName, 600, 350);

    ctx.fillStyle = "#6366f1";
    ctx.fillRect(400, 370, 400, 2);

    ctx.fillStyle = "#64748b";
    ctx.font = "18px Arial, sans-serif";
    ctx.fillText("has successfully completed the course", 600, 420);

    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 28px Georgia, serif";
    const maxWidth = 900;
    const words = courseName.split(" ");
    let line = "";
    let y = 475;
    for (const word of words) {
      const test = line + word + " ";
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line.trim(), 600, y);
        line = word + " ";
        y += 38;
      } else {
        line = test;
      }
    }
    ctx.fillText(line.trim(), 600, y);

    // Footer
    const footerY = Math.max(y + 100, 620);
    ctx.fillStyle = "#64748b";
    ctx.font = "16px Arial, sans-serif";
    ctx.fillText(`Instructor: ${instructorName}`, 350, footerY);
    ctx.fillText(`Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, 850, footerY);

    ctx.fillStyle = "#6366f1";
    ctx.fillRect(220, footerY - 20, 260, 1);
    ctx.fillRect(720, footerY - 20, 260, 1);

    // Award icon placeholder
    ctx.font = "60px serif";
    ctx.fillText("🏆", 600, footerY + 80);

    ctx.fillStyle = "#6366f1";
    ctx.fillRect(100, 770, 1000, 4);

    // Download
    const link = document.createElement("a");
    link.download = `${courseName.replace(/[^a-zA-Z0-9]/g, "_")}_Certificate.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="bg-lms-success/10 border border-lms-success/30 rounded-xl p-6 text-center space-y-3">
      <Award className="h-12 w-12 text-lms-success mx-auto" />
      <p className="font-bold text-lms-success text-lg">🎉 Course Completed Successfully!</p>
      <p className="text-sm text-muted-foreground">
        Congratulations, {studentName}! You've finished all lessons and passed the quiz.
      </p>
      <Button onClick={handleDownload} className="bg-lms-success hover:bg-lms-success/90 text-primary-foreground font-semibold">
        <Download className="h-4 w-4 mr-2" /> Download Certificate
      </Button>
    </div>
  );
};

export default CourseCertificate;
