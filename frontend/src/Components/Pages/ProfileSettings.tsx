import { Box, TextField, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getUser } from "../Services/getUser";
import { updateUser } from "../Services/updateUser";

export const ProfileSettings = () => {
    const [profileData, setProfileData] = useState<any>({
        username: "",
        email: "",
        bio: "",
        profilePictureUrl: "",

    });

    const [usernameError, setUsernameError] = useState("");
    const [currentPasswordError, setCurrentPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [backendError, setBackendError] = useState("");//backend

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const data = await updateUser({
                username: profileData.username,
                bio: profileData.bio,
                profilePictureUrl: profileData.profilePictureUrl,
                currentPassword: currentPassword || undefined,
                newPassword: newPassword || undefined,
                confirmPassword: confirmPassword || undefined,
            });

            alert("Profile updated successfully");
            console.log("Updated user:", data);

            setCurrentPasswordError("");
            setNewPasswordError("");
            setConfirmPasswordError("");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err: any) {
            console.error(err);

            if (err?.response?.data?.error) {
                const errorMessage = err.response.data.error;

                if (errorMessage.toLowerCase().includes("current password")) {
                    setCurrentPasswordError(errorMessage);
                } else {
                    setBackendError(errorMessage);
                }
            } else {
                setBackendError("Update failed. Please try again.");
            }
        }




    };

    const validate = () => {

        let isValid = true;

        if (profileData.username.length < 6) {
            setUsernameError("Username must be 6 characters");
            isValid = false;
        }
        else {
            setUsernameError("");
        }

        if (newPassword.length < 5) {
            setNewPasswordError("Username must be 5 characters");
        }
        else {
            setNewPasswordError("");
        }

        if (newPassword && confirmPassword && newPassword != confirmPassword) {
            setConfirmPasswordError("password must match with new password");
        }
        else {
            setConfirmPasswordError("");
        }
        return isValid;
    }


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser();
                if (response) {
                    setProfileData({
                        username: response.username || "",
                        email: response.email || "",
                        bio: response.bio || "",
                        profilePictureUrl: response.image || "",
                    });
                }
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };
        fetchUser();
    }, []);

    return (
        <Box
            display="flex"
            sx={{
                backgroundColor: "#fafafa",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                sx={{
                    backgroundColor: "white",
                    width: "600px",
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 3,
                    gap: 1.5,
                    marginTop: 7,
                    marginBottom: 5,
                }}
            >
                <Typography variant="h6" fontWeight="bold" textAlign="center">
                    Profile Settings
                </Typography>

                <TextField
                    label="Profile Picture URL"
                    placeholder="Enter image URL"
                    fullWidth
                    name="profilePictureUrl"
                    value={profileData.profilePictureUrl}
                    onChange={handleChange}
                />

                <TextField
                    label="Username"
                    placeholder="Enter your username"
                    fullWidth
                    name="username"
                    value={profileData.username}
                    onChange={handleChange}
                    helperText={usernameError}
                    error={!!usernameError}
                />

                <TextField
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    fullWidth
                    name="email"
                    value={profileData.email}
                    disabled
                />

                <TextField
                    label="Bio"
                    placeholder="Write something about yourself"
                    multiline
                    rows={3}
                    fullWidth
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                />

                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                    Change Password
                </Typography>

                <TextField
                    label="Current Password"
                    type="password"
                    fullWidth
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    error={!!currentPasswordError}
                    helperText={currentPasswordError}
                />

                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <TextField
                    label="Confirm New Password"
                    type="password"
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!confirmPasswordError}
                    helperText={confirmPasswordError}
                />

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#689f38",
                        color: "white",
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": {
                            backgroundColor: "#aed581",
                        },
                    }}

                    onClick={() => {
                        if (validate()) {
                            handleUpdate();
                        }
                    }}

                >
                    Save Changes
                </Button>
            </Box>
        </Box>
    );
};