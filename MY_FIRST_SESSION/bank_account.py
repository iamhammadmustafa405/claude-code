import getpass
import hashlib
import os


def create_account():
    username = input("Enter username: ").strip()
    while not username:
        username = input("Username cannot be empty. Enter username: ").strip()

    password = getpass.getpass("Enter password: ")
    while not password:
        password = getpass.getpass("Password cannot be empty. Enter password: ")

    salt = os.urandom(16)
    password_hash = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 100_000)

    account = {
        "username": username,
        "salt": salt,
        "password_hash": password_hash,
        "balance": 0.0,
    }
    print(f"Bank account created for {username}.")
    return account


if __name__ == "__main__":
    create_account()
