import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Avatar, Text, useTheme } from 'react-native-paper';

export default function HomeScreen() {
  const { colors } = useTheme();

  const culturas = [
    {
      titulo: 'Arquitetura Chinesa',
      descricao:
        'A arquitetura tradicional chinesa é uma das mais antigas e contínuas do mundo, caracterizada por sua elegância, complexidade e profunda conexão com a filosofia. Edifícios como templos, palácios e jardins são construídos com madeira predominantemente, telhados curvos e ornamentados que se estendem para o céu, simbolizando a ligação entre o céu e a terra. A simetria, o uso de cores vibrantes como o vermelho e o dourado, e a integração com a paisagem natural são pilares que refletem a busca pela harmonia e o equilíbrio cósmico na cultura chinesa. É um legado que fascina pela sua durabilidade e beleza intrínseca.',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7TMVozKEqVaPenu9GHRC_0GhQoasawBGwBA&s',
    },
    {
      titulo: 'Culinária Brasileira',
      descricao:
        'A culinária do Brasil é um verdadeiro reflexo da sua história e miscigenação. É um caldeirão de sabores que mescla a riqueza dos ingredientes nativos (como mandioca, açaí, guaraná) com as contribuições das culturas indígena, africana (através de pratos com dendê, pimentas e quiabo) e europeia (com técnicas e ingredientes trazidos por portugueses, italianos, alemães e outros). Cada região do país possui suas especialidades, desde a feijoada carioca, passando pelo acarajé baiano, o pato no tucupi amazônico e o churrasco gaúcho. Essa diversidade não é apenas sobre comida, mas sobre identidade, celebração e o acolhimento caloroso do povo brasileiro.',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2v3kr4dwCwKHvbN02S8jAs5_7OCy4LAt-uQ&s',
    },
    {
      titulo: 'Festas Típicas Africanas',
      descricao:
        'As festas e celebrações na África são manifestações culturais profundas, repletas de ritmo, cores e um forte senso de comunidade. Elas podem ser celebrações de colheitas, rituais de passagem, festivais religiosos ou eventos históricos. A música, expressa através de tambores e instrumentos tradicionais, e a dança são elementos centrais, atuando como linguagens universais que contam histórias e invocam espíritos. As vestimentas são vibrantes, com tecidos estampados e adereços elaborados que simbolizam status, identidade e a riqueza da herança cultural. Essas festividades não são apenas entretenimento, mas espaços vitais para a transmissão de conhecimentos, valores e a manutenção da coesão social entre gerações.',
      imagem: 'https://www.notibras.com/site/wp-content/uploads/2019/04/Cultura-Africana-18.jpg',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.introContainer, { backgroundColor: colors.surface }]}>
        <Text variant="headlineMedium" style={[styles.introTitle, { color: colors.primary }]}>
          Um Mundo de Cores e Tradições
        </Text>
        <Text variant="bodyLarge" style={[styles.introText, { color: colors.onSurface }]}>
          O planeta em que vivemos é um tesouro de diversidade cultural, onde cada nação, região e comunidade tece um complexo tapete de tradições, crenças, artes e modos de vida. Estima-se que existam milhares de culturas distintas em todo o globo, cada uma contribuindo com sua própria perspectiva única para a tapeçaria da humanidade.
          {'\n\n'}
          Essa variedade se manifesta em inúmeras formas, desde a arquitetura que molda nossas cidades, passando pelas festividades que nos unem em celebração, até a culinária que nutre nosso corpo e alma. É na exploração dessas diferenças que encontramos uma fonte inesgotável de aprendizado, respeito e admiração. Descobrir outras culturas é expandir nossos próprios horizontes, entendendo que não há uma única forma de viver, mas sim um universo de possibilidades.
          {'\n\n'}
          Prepare-se para uma pequena jornada por alguns exemplos fascinantes dessa riqueza cultural!
        </Text>
      </View>

      {culturas.map((cultura, index) => (
        <Card
          key={index}
          style={[
            styles.card,
            {
              marginTop: index === 0 ? 0 : 32,
              backgroundColor: colors.surface,
              shadowColor: colors.primary,
            },
          ]}
          elevation={6}
        >
          <Card.Title
            title={cultura.titulo}
            titleNumberOfLines={2}
            titleStyle={[styles.cardTitle, { color: colors.primary }]}
            left={(props) => (
              <Avatar.Image
                {...props}
                source={{ uri: cultura.imagem }}
                size={70}
                style={styles.avatar}
              />
            )}
          />
          <Card.Content>
            <Text variant="bodyMedium" style={[styles.cardDescription, { color: colors.onSurface }]}>
              {cultura.descricao}
            </Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  introContainer: {
    marginBottom: 32,
    padding: 20,
    borderRadius: 20,
    // sombra suave para a intro
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  introTitle: {
    fontWeight: '900',
    marginBottom: 14,
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
  },
  introText: {
    textAlign: 'justify',
    lineHeight: 24,
    fontSize: 16,
    fontFamily: 'serif',
  },
  card: {
    borderRadius: 18,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  avatar: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#6200ee',
    marginRight: 0,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  cardDescription: {
    lineHeight: 24,
    fontSize: 16,
    marginTop: 6,
    fontFamily: 'serif',
  },
});
