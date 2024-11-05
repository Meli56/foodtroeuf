import {validateInfo} from "../pages/SignUpPage";

test('Verification des information d\'inscription', () => {
    const resultValid = validateInfo(
        'test@supdevinci-edu.fr',
        'Johnny Test',
        'MonMotDePasse',
        'MonMotDePasse'
    )

    const resultInvalidEmail = validateInfo(
        'test@gmail.fr',
        'Johnny Test',
        'MonMotDePasse',
        'MonMotDePasse'
    )

    const resultInvalidUsername = validateInfo(
        'test@supdevinci-edu.fr',
        'Johnny ',
        'MonMotDePasse',
        'MonMotDePasse'
    )
    const resultInvalidPassword = validateInfo(
        'test@supdevinci-edu.fr',
        'Johnny Test',
        '',
        ''
    )
    const resultInvalidConfirmPassword = validateInfo(
        'test@supdevinci-edu.fr',
        'Johnny Test',
        'MonMotDePasse',
        'MonMotDePase'
    )

    expect(resultValid).toBe(true)
    expect(resultInvalidEmail).toBe(false)
    expect(resultInvalidUsername).toBe(false)
    expect(resultInvalidPassword).toBe(false)
    expect(resultInvalidConfirmPassword).toBe(false)
});