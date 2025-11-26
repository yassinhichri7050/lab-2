import 'package:appwrite/appwrite.dart';
import 'package:appwrite/models.dart' show Session;
import 'package:appwrite/models.dart' as models;

import 'appwrite_config.dart';

/// Encapsulates all Appwrite authentication flows used in the app.
class AuthService {
  final Client _client = getClient();
  late final Account _account;

  AuthService() {
    _account = Account(_client);
  }

  /// Creates a user account then signs in to return the active session.
  Future<Session> createAccount(
    String email,
    String password,
    String name,
  ) async {
    await _account.create(
      userId: ID.unique(),
      email: email,
      password: password,
      name: name,
    );
    return login(email, password);
  }

  /// Signs the user in with email/password credentials.
  Future<Session> login(String email, String password) {
    return _account.createEmailSession(email: email, password: password);
  }

  /// Returns the currently authenticated user or null when no session exists.
  Future<models.Account?> getCurrentUser() async {
    try {
      return await _account.get();
    } on AppwriteException catch (error) {
      if (error.code == 401) {
        return null;
      }
      rethrow;
    }
  }

  /// Clears the active session on the device.
  Future<void> logout() {
    return _account.deleteSession(sessionId: 'current');
  }
}
