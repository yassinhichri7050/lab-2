import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../screens/auth_screen.dart';
import '../screens/home_screen.dart';
import '../screens/notes_screen.dart';

class AuthNavigator extends StatelessWidget {
  const AuthNavigator({super.key});

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);

    if (authProvider.loading) {
      return MaterialApp(
        debugShowCheckedModeBanner: false,
        home: const Scaffold(
          body: Center(child: CircularProgressIndicator()),
        ),
      );
    }

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Notes App',
      theme: ThemeData(primarySwatch: Colors.deepOrange),
      home: authProvider.isAuthenticated ? const HomeScreen() : const AuthScreen(),
      routes: {
        'auth': (context) => const AuthScreen(),
        'home': (context) => const HomeScreen(),
        'notes': (context) => const NotesScreen(),
      },
    );
  }
}
