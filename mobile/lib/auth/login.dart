import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:hydralite_app/auth/loginButton.dart';

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  @override
  Widget build(BuildContext context) {
    final bool lightMode = Theme.of(context).brightness == Brightness.light;

    final mySystemTheme = SystemUiOverlayStyle.light.copyWith(
        systemNavigationBarColor: lightMode ? Colors.white : Colors.black);

    SystemChrome.setSystemUIOverlayStyle(mySystemTheme);

    return SafeArea(
      child: Scaffold(
        backgroundColor: lightMode ? Colors.white : Color(0xFF303030),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.only(
                top: 18.0,
              ),
              child: Wrap(
                direction: Axis.horizontal,
                crossAxisAlignment: WrapCrossAlignment.start,
                spacing: 30.0,
                children: [
                  Text(
                    'Login',
                    textAlign: TextAlign.start,
                    style: GoogleFonts.montserrat(
                      color: lightMode ? Color(0x303030FF) : Color(0xFFAF98FF),
                      fontSize: 17.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    'Create Account',
                    textAlign: TextAlign.end,
                    style: GoogleFonts.montserrat(
                      fontWeight: FontWeight.w600,
                      color: lightMode ? Color(0xFF2D3748) : Color(0xFFFFFFFF),
                      fontSize: 16.5,
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(
                top: 13.0,
              ),
              child: Divider(
                color: lightMode ? Color(0xFFBFBFBF) : Color(0xFF555555),
                thickness: 0.75,
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(
                top: 35.0,
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Login To ',
                    style: GoogleFonts.montserrat(
                      fontSize: 35.0,
                      fontWeight: FontWeight.w600,
                      color: lightMode ? Color(0xFF2D3748) : Color(0xFFFFFFFF),
                    ),
                  ),
                  Text(
                    'Hydralite',
                    style: GoogleFonts.montserrat(
                      fontSize: 35.0,
                      fontWeight: FontWeight.w600,
                      color: lightMode ? Color(0xFF695CFF) : Color(0xFFAF98FF),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(
                top: 5.0,
              ),
              child: Text(
                'Discover. Develop. Deploy.',
                style: GoogleFonts.montserrat(
                  fontSize: 21,
                  fontWeight: FontWeight.w700,
                  color: lightMode ? Color(0xFF2D3748) : Color(0xFFFFFFFF),
                ),
              ),
            ),
            SizedBox(
              height: 50,
            ),
            SizedBox(
              width: MediaQuery.of(context).size.width - 40,
              height: 65,
              child: LoginButton(
                  icon: FaIcon(
                    FontAwesomeIcons.google,
                  ),
                  value: "Continue With Google",
                  lightMode: lightMode),
            ),
            SizedBox(
              height: 15,
            ),
            SizedBox(
              width: MediaQuery.of(context).size.width - 40,
              height: 65,
              child: LoginButton(
                icon: FaIcon(FontAwesomeIcons.github),
                value: "Continue With Github",
                lightMode: lightMode,
              ),
            ),
            SizedBox(
              height: 15,
            ),
            SizedBox(
                width: MediaQuery.of(context).size.width - 40,
                height: 65,
                child: LoginButton(
                    icon: FaIcon(FontAwesomeIcons.twitter),
                    lightMode: lightMode,
                    value: "Continue With Twitter")),
            SizedBox(
              height: 15,
            ),
            SizedBox(
                width: MediaQuery.of(context).size.width - 40,
                height: 65,
                child: LoginButton(
                  icon: FaIcon(FontAwesomeIcons.discord),
                  value: "Continue With Discord",
                  lightMode: lightMode,
                )),
            Padding(
              padding: const EdgeInsets.only(top: 75.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'By continuing, you agree to our ',
                    style: GoogleFonts.montserrat(
                      fontSize: 14.5,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                  Text(
                    'Terms & Privacy',
                    style: GoogleFonts.montserrat(
                      color: lightMode
                          ? Color(
                              0xFF695CFF,
                            )
                          : Color(0xFFAF98FF),
                      fontSize: 14.5,
                      fontWeight: FontWeight.w500,
                    ),
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
