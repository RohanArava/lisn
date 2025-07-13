import { Box, Typography, Stack } from "@mui/material";
import PlayerControls from "./PlayerControls";
import SeekBar from "./SeekBar";

// Hardcoded track details for demo purposes
// In a real app, these would be dynamic based on the current track
export default function TrackDetails(props) {
    const { isPlaying, togglePlayback, currentTime, duration, handleSeek } = props;
    return (
        <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            sx={{
                backgroundColor: "#1b1d2a",
                borderRadius: 4,
                boxShadow: 6,
                p: 4,
                alignItems: "center",
                margin: "48px 12px",
            }}
        >
            <Box
                component="img"
                src="/pic.jpg"
                alt="Else hit"
                sx={{
                    width: 280,
                    height: 280,
                    borderRadius: 2,
                    objectFit: "cover",
                    boxShadow: 3,
                }}
            />
            <Box flex={1} sx={{ textAlign: "center" }}>
                <Stack spacing={2}>
                    <Box flex={1} sx={{ textAlign: "center" }}>
                        <Typography variant="h5" sx={{ color: "#fff", fontWeight: 600 }}>
                            Else Hit
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: "#f48fb1", mb: 3 }}>
                            Greg Wood
                        </Typography>
                    </Box>
                    <PlayerControls isPlaying={isPlaying} togglePlayback={togglePlayback} />
                    <SeekBar currentTime={currentTime} duration={duration} onSeek={handleSeek} />
                </Stack>
            </Box>
        </Stack>
    );
}
