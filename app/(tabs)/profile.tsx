import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '@/configs/firebaseConfig';
import { reauthenticateWithCredential, updateEmail, updatePassword, EmailAuthProvider } from 'firebase/auth';

export default function ProfileUpdate() {
    const user = auth.currentUser;
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newEmail, setNewEmail] = useState(user?.email || '');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Function to reauthenticate the user
    const reauthenticateUser = async () => {
        if (!user || !currentPassword) {
            Alert.alert('Error', 'Please enter your current password to proceed.');
            return false;
        }

        const credential = EmailAuthProvider.credential(user.email || '', currentPassword);
        try {
            await reauthenticateWithCredential(user, credential);
            return true;
        } catch (error) {
            Alert.alert('Authentication Failed', 'Incorrect password. Please try again.');
            return false;
        }
    };

    // Function to update email and/or password
    const handleUpdate = async () => {
        setLoading(true);
        try {
            const isReauthenticated = await reauthenticateUser();
            if (!isReauthenticated) return;

            // Update email if it has changed
            if (newEmail !== user?.email) {
                await updateEmail(user, newEmail);
                Alert.alert('Success', 'Email updated successfully!');
            }

            // Update password if provided
            if (newPassword.length > 0) {
                await updatePassword(user, newPassword);
                Alert.alert('Success', 'Password updated successfully!');
            }

            Alert.alert('Profile Updated', 'Your profile has been updated.');
        } catch (error) {
            Alert.alert('Update Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Profile</Text>

            <Text style={styles.label}>New Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter new email"
                value={newEmail}
                onChangeText={setNewEmail}
                keyboardType="email-address"
            />

            <Text style={styles.label}>New Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter new password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />

            <Text style={styles.label}>Current Password (Required)</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter current password"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Updating...' : 'Update Profile'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        marginTop:40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

