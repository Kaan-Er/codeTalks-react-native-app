import React, {useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {Formik} from 'formik';
import Input from '../../components/Input';
import styles from './Login.styles';
import Button from '../../components/Button';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({email, password}) => {
    try {
      if (email !== '' && password !== '') {
        setLoading(true);
        await auth().signInWithEmailAndPassword(email, password);
        setLoading(false);
      }
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
          initialValues={{email: '', password: ''}}
          onSubmit={handleLogin}>
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
              <View style={styles.buttons}>
                <Button
                  text="Giriş Yap"
                  onPress={handleSubmit}
                  theme="primary"
                />
                <Button
                  text="Kayıt Ol"
                  loading={loading}
                  onPress={() => navigation.navigate('Register')}
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

export default Login;
