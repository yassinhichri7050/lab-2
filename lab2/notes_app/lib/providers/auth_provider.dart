import 'package:appwrite/models.dart' as models;
import 'package:flutter/foundation.dart';

import '../services/auth_service.dart';

class AuthProvider extends ChangeNotifier {
  final AuthService authService = AuthService();

  models.Account? _user;
  bool _loading = true;

  AuthProvider() {
    checkUserStatus();
  }

  models.Account? get user => _user;
  bool get loading => _loading;
  bool get isAuthenticated => _user != null;

  Future<void> checkUserStatus() async {
    _loading = true;
    notifyListeners();

    try {
      _user = await authService.getCurrentUser();
    } catch (_) {
      _user = null;
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  Future<bool> register(String email, String password, String name) async {
    try {
      await authService.createAccount(email, password, name);
      _user = await authService.getCurrentUser();
      notifyListeners();
      return true;
    } catch (_) {
      return false;
    }
  }

  Future<bool> login(String email, String password) async {
    try {
      await authService.login(email, password);
      _user = await authService.getCurrentUser();
      notifyListeners();
      return true;
    } catch (_) {
      return false;
    }
  }

  Future<bool> logout() async {
    try {
      await authService.logout();
      _user = null;
      notifyListeners();
      return true;
    } catch (_) {
      return false;
    }
  }
}
