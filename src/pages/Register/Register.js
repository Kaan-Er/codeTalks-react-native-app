import React, {useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {Formik} from 'formik';
import Input from '../../components/Input';
import styles from './Register.styles';
import Button from '../../components/Button';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

const Register = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async ({email, password, repassword}) => {
    if (password !== repassword) {
      showMessage({
        message: 'Şifreler uyumlu değil',
        type: 'danger',
      });
      return;
    }
    try {
      setLoading(true);
      if (email !== '' && password !== '' && repassword !== '') {
        await auth().createUserWithEmailAndPassword(email, password);
      }
      setLoading(false);
    } catch (error) {
      showMessage({
        message: error.code,
        type: 'danger',
      });
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo_container}>
        <Text style={styles.logoText}>codetalks</Text>
      </View>

      <View style={styles.content}>
        <Formik
          initialValues={{email: '', password: '', repassword: ''}}
          onSubmit={handleRegister}>
          {({handleSubmit, handleChange, values}) => (
            <View>
              <Input
                placeholder="e-postanızı giriniz.."
                value={values.email}
                onChangeText={handleChange('email')}
              />
              <Input
                placeholder="şifrenizi giriniz.."
                value={values.password}
                onChangeText={handleChange('password')}
                secureTextEntry={true}
              />
              <Input
                placeholder="şifrenizi tekrar giriniz.."
                value={values.repassword}
                onChangeText={handleChange('repassword')}
                secureTextEntry={true}
              />
              <View style={styles.buttons}>
                <Button
                  loading={loading}
                  text="Kayıt Ol"
                  onPress={handleSubmit}
                  theme="primary"
                />
                <Button
                  text="Geri"
                  onPress={() => navigation.goBack()}
                  theme="secondary"
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default Register;
