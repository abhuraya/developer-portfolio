import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Database,
  GitBranch,
  Mail,
  Server,
  Sparkles,
} from "lucide-react";

const colors = {
  ink: "#1d211c",
  muted: "#62685f",
  line: "#d8d9d1",
  paper: "#f7f5ef",
  surface: "#fffdf8",
  forest: "#314b38",
  forestLight: "#d8e6cc",
  lime: "#d9efad",
  rust: "#a74f36",
};

const projects = [
  {
    number: "01",
    title: "Boston Dumplings",
    type: "Full-stack ordering experience",
    description:
      "A welcoming restaurant storefront with a streamlined cart and checkout flow, customer accounts, pickup or delivery options, and automated order emails.",
    highlights: ["Responsive ordering flow", "Express + MySQL accounts", "Netlify email function"],
    tags: ["React", "Vite", "Express", "MySQL", "Netlify"],
    live: "https://bostondumplings.com",
    repository: "https://github.com/abhuraya/Boston_Dumplings",
    visual: "dumplings",
    featured: true,
  },
  {
    number: "02",
    title: "Flag Quiz",
    type: "Interactive geography game",
    description:
      "A fast, responsive quiz experience with difficulty levels, timed questions, immediate feedback, and a best score that persists between sessions.",
    highlights: ["Timed quiz sessions", "Difficulty levels", "Persistent best score"],
    tags: ["React", "Vite", "React Router", "Material UI"],
    live: "https://flagquizlet.netlify.app",
    repository: "https://github.com/abhuraya/Flag_Quiz",
    visual: "flags",
  },
  {
    number: "03",
    title: "Calculator",
    type: "Vanilla JavaScript application",
    description:
      "A polished dark-mode calculator supporting chained arithmetic, decimals, keyboard input, deletion, and clear error handling across screen sizes.",
    highlights: ["Keyboard controls", "Chained operations", "Responsive CSS Grid"],
    tags: ["JavaScript", "HTML5", "CSS3", "Netlify"],
    live: "https://lightcalculator.netlify.app",
    repository: "https://github.com/abhuraya/Calculator",
    visual: "calculator",
  },
];

const skills = [
  {
    icon: Braces,
    title: "Front end",
    items: "React, JavaScript, Chakra UI, Material UI, Bootstrap, HTML, CSS",
  },
  {
    icon: Server,
    title: "Back end",
    items: "Node.js, Express, REST APIs, authentication, Netlify Functions",
  },
  {
    icon: Database,
    title: "Data",
    items: "MySQL, SQL, MongoDB, relational modeling, validation",
  },
  {
    icon: Code2,
    title: "Workflow",
    items: "Git, GitHub, VS Code, npm, Netlify, testing and debugging",
  },
];

function SectionLabel({ children, light = false }) {
  return (
    <HStack gap="3" mb="5">
      <Box w="8" h="1px" bg={light ? colors.lime : colors.forest} />
      <Text
        as="p"
        color={light ? colors.lime : colors.forest}
        fontSize="xs"
        fontWeight="800"
        letterSpacing="0.18em"
        textTransform="uppercase"
      >
        {children}
      </Text>
    </HStack>
  );
}

function LinkButton({ href, children, primary = false }) {
  return (
    <Button
      asChild
      h="12"
      px="6"
      borderRadius="full"
      border="1px solid"
      borderColor={primary ? colors.forest : colors.line}
      bg={primary ? colors.forest : "transparent"}
      color={primary ? "white" : colors.ink}
      fontWeight="700"
      boxShadow="none"
      transition="all 180ms ease"
      _hover={{
        bg: primary ? "#243b2b" : colors.surface,
        borderColor: colors.forest,
        transform: "translateY(-2px)",
      }}
      _focusVisible={{ outline: `3px solid ${colors.lime}`, outlineOffset: "3px" }}
    >
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {children}
      </a>
    </Button>
  );
}

function ProjectVisual({ type }) {
  if (type === "dumplings") {
    return (
      <Box
        aria-hidden="true"
        position="relative"
        minH={{ base: "260px", md: "340px" }}
        overflow="hidden"
        bg="#e7d7bd"
      >
        <Box
          position="absolute"
          top="10%"
          right="8%"
          w="46%"
          h="34%"
          borderRadius="50%"
          bg="#c85f3f"
          opacity="0.9"
        />
        <Box
          position="absolute"
          left="10%"
          bottom="11%"
          w="76%"
          h="48%"
          borderRadius="50%"
          bg="#fbf7ed"
          border="10px solid #314b38"
          boxShadow="0 22px 55px rgba(29, 33, 28, 0.22)"
        >
          <Flex h="100%" align="center" justify="center" gap={{ base: "2", md: "4" }}>
            {["-12deg", "2deg", "14deg"].map((rotation) => (
              <Box
                key={rotation}
                w={{ base: "58px", md: "84px" }}
                h={{ base: "48px", md: "66px" }}
                borderRadius="50% 50% 46% 46%"
                bg="#f1d9a8"
                border="2px solid #c49a58"
                transform={`rotate(${rotation})`}
                boxShadow="inset 0 -9px 0 rgba(183, 130, 61, 0.14)"
              />
            ))}
          </Flex>
        </Box>
        <Text
          position="absolute"
          top="8%"
          left="8%"
          color={colors.ink}
          fontSize={{ base: "xl", md: "3xl" }}
          fontWeight="900"
          letterSpacing="-0.04em"
        >
          Handmade. Simple. Good.
        </Text>
      </Box>
    );
  }

  if (type === "flags") {
    return (
      <Box
        aria-hidden="true"
        minH="245px"
        p={{ base: "6", md: "8" }}
        bg="#dce8ff"
        backgroundImage="radial-gradient(#8ca4ce 1px, transparent 1px)"
        backgroundSize="18px 18px"
      >
        <Flex justify="space-between" align="center" mb="7">
          <Badge px="3" py="1" borderRadius="full" bg="white" color="#3f5271">
            QUESTION 07 / 10
          </Badge>
          <Text color="#3f5271" fontWeight="800">
            00:12
          </Text>
        </Flex>
        <Text mb="5" color="#25334b" fontSize="lg" fontWeight="800">
          Which country has this flag?
        </Text>
        <Flex
          w="112px"
          h="74px"
          mb="7"
          borderRadius="md"
          align="center"
          justify="center"
          bg="white"
          boxShadow="0 14px 30px rgba(42, 62, 94, 0.18)"
          fontSize="5xl"
        >
          🇳🇵
        </Flex>
        <SimpleGrid columns="2" gap="3">
          {["Nepal", "Bhutan", "India", "Sri Lanka"].map((country, index) => (
            <Box
              key={country}
              px="4"
              py="3"
              borderRadius="lg"
              bg={index === 0 ? "#364f79" : "rgba(255, 255, 255, 0.88)"}
              color={index === 0 ? "white" : "#33405a"}
              fontSize="sm"
              fontWeight="700"
            >
              {country}
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  return (
    <Flex
      aria-hidden="true"
      minH="245px"
      align="center"
      justify="center"
      p="7"
      bg="#d9ead9"
    >
      <Box
        w="210px"
        p="4"
        borderRadius="3xl"
        bg="#171a18"
        boxShadow="0 22px 45px rgba(29, 33, 28, 0.28)"
      >
        <Flex
          h="52px"
          mb="3"
          px="4"
          align="center"
          justify="flex-end"
          borderRadius="xl"
          bg="#2b302d"
          color="#eff5ea"
          fontFamily="monospace"
          fontSize="2xl"
        >
          1,024
        </Flex>
        <SimpleGrid columns="4" gap="2">
          {["AC", "DEL", "÷", "×", "7", "8", "9", "−", "4", "5", "6", "+", "1", "2", "3", "=", "0", "."].map(
            (key, index) => (
              <Flex
                key={`${key}-${index}`}
                minH="32px"
                gridColumn={key === "0" ? "span 2" : undefined}
                gridRow={key === "=" ? "span 2" : undefined}
                align="center"
                justify="center"
                borderRadius="lg"
                bg={key === "=" ? colors.rust : ["÷", "×", "−", "+"].includes(key) ? "#8fb06e" : "#343a36"}
                color="white"
                fontSize="xs"
                fontWeight="800"
              >
                {key}
              </Flex>
            ),
          )}
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

function ProjectCard({ project }) {
  return (
    <Grid
      as="article"
      gridColumn={project.featured ? { lg: "1 / -1" } : undefined}
      templateColumns={project.featured ? { base: "1fr", lg: "1.08fr 0.92fr" } : "1fr"}
      overflow="hidden"
      border="1px solid"
      borderColor={colors.line}
      borderRadius={{ base: "2xl", md: "3xl" }}
      bg={colors.surface}
      boxShadow="0 16px 55px rgba(29, 33, 28, 0.06)"
      transition="transform 220ms ease, box-shadow 220ms ease"
      _hover={{ transform: "translateY(-5px)", boxShadow: "0 24px 70px rgba(29, 33, 28, 0.11)" }}
    >
      <ProjectVisual type={project.visual} />

      <Stack p={{ base: "6", md: "8", lg: project.featured ? "10" : "8" }} gap="5">
        <Flex align="center" justify="space-between" gap="4">
          <Text color={colors.forest} fontSize="xs" fontWeight="800" letterSpacing="0.14em" textTransform="uppercase">
            {project.type}
          </Text>
          <Text color="#a9ada4" fontSize="2xl" fontWeight="800">
            {project.number}
          </Text>
        </Flex>

        <Heading color={colors.ink} fontSize={{ base: "2xl", md: project.featured ? "4xl" : "3xl" }} letterSpacing="-0.04em">
          {project.title}
        </Heading>

        <Text color={colors.muted} fontSize={{ base: "md", md: "lg" }} lineHeight="1.75">
          {project.description}
        </Text>

        <Stack gap="2">
          {project.highlights.map((highlight) => (
            <HStack key={highlight} gap="3" color={colors.ink}>
              <Flex w="5" h="5" flex="0 0 auto" align="center" justify="center" borderRadius="full" bg={colors.forestLight}>
                <Check size={12} strokeWidth={3} />
              </Flex>
              <Text fontSize="sm" fontWeight="650">
                {highlight}
              </Text>
            </HStack>
          ))}
        </Stack>

        <Flex flexWrap="wrap" gap="2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              px="3"
              py="1.5"
              borderRadius="full"
              border="1px solid"
              borderColor={colors.line}
              bg="transparent"
              color={colors.muted}
              fontSize="xs"
              fontWeight="700"
            >
              {tag}
            </Badge>
          ))}
        </Flex>

        <HStack pt="2" gap="5" flexWrap="wrap">
          <Link
            href={project.live}
            target="_blank"
            rel="noreferrer"
            color={colors.forest}
            fontWeight="800"
            textDecoration="none"
            _hover={{ color: colors.rust }}
            _focusVisible={{ outline: `3px solid ${colors.lime}`, outlineOffset: "3px" }}
          >
            <HStack gap="2">
              <Text>Visit live app</Text>
              <ArrowUpRight size={17} />
            </HStack>
          </Link>
          <Link
            href={project.repository}
            target="_blank"
            rel="noreferrer"
            color={colors.muted}
            fontWeight="700"
            textDecoration="none"
            _hover={{ color: colors.ink }}
            _focusVisible={{ outline: `3px solid ${colors.lime}`, outlineOffset: "3px" }}
          >
            <HStack gap="2">
              <GitBranch size={17} />
              <Text>View repository</Text>
            </HStack>
          </Link>
        </HStack>
      </Stack>
    </Grid>
  );
}

function App() {
  return (
    <Box minH="100vh" color={colors.ink}>
      <Box
        as="header"
        position="sticky"
        top="0"
        zIndex="10"
        borderBottom="1px solid rgba(216, 217, 209, 0.78)"
        bg="rgba(247, 245, 239, 0.86)"
        backdropFilter="blur(18px)"
      >
        <Container maxW="1180px" px={{ base: "5", md: "8" }}>
          <Flex h="18" align="center" justify="space-between">
            <Link
              href="#home"
              color={colors.ink}
              fontSize="lg"
              fontWeight="900"
              letterSpacing="-0.04em"
              textDecoration="none"
              _focusVisible={{ outline: `3px solid ${colors.lime}`, outlineOffset: "4px" }}
            >
              AR<span style={{ color: colors.rust }}>.</span>
            </Link>

            <HStack as="nav" aria-label="Primary navigation" display={{ base: "none", md: "flex" }} gap="7">
              {["About", "Projects", "Skills"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  color={colors.muted}
                  fontSize="sm"
                  fontWeight="700"
                  textDecoration="none"
                  _hover={{ color: colors.ink }}
                  _focusVisible={{ outline: `3px solid ${colors.lime}`, outlineOffset: "4px" }}
                >
                  {item}
                </Link>
              ))}
            </HStack>

            <Button
              asChild
              h="10"
              px={{ base: "4", md: "5" }}
              borderRadius="full"
              bg={colors.ink}
              color="white"
              fontSize="sm"
              _hover={{ bg: colors.forest, transform: "translateY(-1px)" }}
              _focusVisible={{ outline: `3px solid ${colors.lime}`, outlineOffset: "3px" }}
            >
              <a href="mailto:arayamajhi19@gmail.com">
                <HStack gap="2">
                  <Mail size={15} />
                  <Text display={{ base: "none", sm: "block" }}>Let&apos;s talk</Text>
                  <Text display={{ base: "block", sm: "none" }}>Email</Text>
                </HStack>
              </a>
            </Button>
          </Flex>
        </Container>
      </Box>

      <Box as="main">
        <Container id="home" maxW="1180px" px={{ base: "5", md: "8" }} pt={{ base: "20", md: "28" }} pb={{ base: "24", md: "32" }}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: "14", lg: "16" }} alignItems="end">
            <Stack gap="7">
              <HStack gap="3">
                <Flex w="8" h="8" align="center" justify="center" borderRadius="full" bg={colors.forestLight} color={colors.forest}>
                  <Sparkles size={16} />
                </Flex>
                <Text color={colors.forest} fontSize="sm" fontWeight="800" letterSpacing="0.1em" textTransform="uppercase">
                  Full-stack developer
                </Text>
              </HStack>

              <Heading
                as="h1"
                maxW="760px"
                color={colors.ink}
                fontSize={{ base: "5xl", sm: "6xl", md: "7xl", lg: "8xl" }}
                fontWeight="850"
                letterSpacing="-0.065em"
                lineHeight={{ base: "0.98", md: "0.94" }}
              >
                Software built with clarity and care.
              </Heading>

              <Text maxW="650px" color={colors.muted} fontSize={{ base: "lg", md: "xl" }} lineHeight="1.7">
                I&apos;m Abhudaya Rayamajhi. I combine software development with a background in healthcare, research, and quality systems to build useful products people can trust.
              </Text>

              <Flex flexWrap="wrap" gap="3">
                <LinkButton href="#projects" primary>
                  <HStack gap="2">
                    <Text>Explore my work</Text>
                    <ArrowDownRight size={17} />
                  </HStack>
                </LinkButton>
              </Flex>
            </Stack>

            <Box
              position="relative"
              minH={{ base: "330px", md: "410px" }}
              overflow="hidden"
              borderRadius={{ base: "3xl", md: "4xl" }}
              bg={colors.forest}
              color="white"
              boxShadow="0 28px 90px rgba(49, 75, 56, 0.22)"
            >
              <Box position="absolute" inset="0" opacity="0.28" backgroundImage="linear-gradient(rgba(255,255,255,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.13) 1px, transparent 1px)" backgroundSize="38px 38px" />
              <Box position="absolute" top="-16%" right="-8%" w="260px" h="260px" borderRadius="full" bg={colors.lime} opacity="0.9" />
              <Box position="absolute" right="12%" bottom="-18%" w="220px" h="220px" borderRadius="full" border={`38px solid ${colors.rust}`} opacity="0.9" />

              <Stack position="relative" h="100%" minH="inherit" p={{ base: "7", md: "10" }} justify="space-between">
                <Flex justify="space-between" align="start">
                  <Badge px="3" py="1.5" borderRadius="full" bg="rgba(255,255,255,.12)" color="white" backdropFilter="blur(8px)">
                    OPEN TO OPPORTUNITIES
                  </Badge>
                  <Text fontFamily="monospace" fontSize="sm" opacity="0.72">
                    2026
                  </Text>
                </Flex>

                <Stack gap="4" maxW="400px">
                  <Text color={colors.lime} fontFamily="monospace" fontSize="sm">
                    &lt;developer profile /&gt;
                  </Text>
                  <Heading fontSize={{ base: "3xl", md: "5xl" }} letterSpacing="-0.05em" lineHeight="1">
                    Thoughtful code. Reliable outcomes.
                  </Heading>
                  <Text maxW="330px" color="rgba(255,255,255,.72)" lineHeight="1.65">
                    React interfaces, Node.js services, SQL data, and a steady focus on the person using the product.
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </SimpleGrid>
        </Container>

        <Box borderY="1px solid" borderColor={colors.line} bg="rgba(255, 253, 248, 0.7)">
          <Container maxW="1180px" px={{ base: "5", md: "8" }} py="5">
            <Flex justify="space-between" gap="6" flexWrap="wrap" color={colors.muted} fontSize="sm" fontWeight="700">
              <Text>REACT + CHAKRA UI</Text>
              <Text>NODE.JS + EXPRESS</Text>
              <Text>MYSQL + REST APIS</Text>
              <Text>NETLIFY + GITHUB</Text>
            </Flex>
          </Container>
        </Box>

        <Container id="about" maxW="1180px" px={{ base: "5", md: "8" }} py={{ base: "24", md: "32" }}>
          <SectionLabel>About</SectionLabel>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: "10", md: "20" }}>
            <Heading fontSize={{ base: "4xl", md: "6xl" }} letterSpacing="-0.055em" lineHeight="1.02">
              A different perspective on building software.
            </Heading>
            <Stack gap="6" color={colors.muted} fontSize={{ base: "lg", md: "xl" }} lineHeight="1.75">
              <Text>
                My work across healthcare, clinical research, and quality systems taught me to listen carefully, investigate methodically, and communicate complex ideas clearly.
              </Text>
              <Text>
                I bring that same discipline to software: understand the real problem, keep the experience simple, and build the details to last.
              </Text>
            </Stack>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap="5" mt={{ base: "14", md: "20" }}>
            {[
              ["01", "Clear thinking", "I turn broad requirements into focused, testable steps."],
              ["02", "Human-centered", "I design around the person using the product, not just the code."],
              ["03", "Built for trust", "I value reliability, readable systems, and thoughtful validation."],
            ].map(([number, title, copy]) => (
              <Stack key={number} p={{ base: "6", md: "7" }} gap="7" borderTop="2px solid" borderColor={colors.forest} bg={colors.surface}>
                <Text color={colors.rust} fontWeight="900">
                  {number}
                </Text>
                <Box>
                  <Heading mb="3" fontSize="xl" letterSpacing="-0.025em">
                    {title}
                  </Heading>
                  <Text color={colors.muted} lineHeight="1.65">
                    {copy}
                  </Text>
                </Box>
              </Stack>
            ))}
          </SimpleGrid>
        </Container>

        <Box id="projects" bg="#eeeee7" borderY="1px solid" borderColor={colors.line}>
          <Container maxW="1180px" px={{ base: "5", md: "8" }} py={{ base: "24", md: "32" }}>
            <Flex mb={{ base: "12", md: "16" }} align={{ base: "start", md: "end" }} justify="space-between" direction={{ base: "column", md: "row" }} gap="6">
              <Box>
                <SectionLabel>Selected projects</SectionLabel>
                <Heading maxW="760px" fontSize={{ base: "4xl", md: "6xl" }} letterSpacing="-0.055em" lineHeight="1">
                  Recent work, made to be used.
                </Heading>
              </Box>
              <Link
                href="https://github.com/abhuraya"
                target="_blank"
                rel="noreferrer"
                color={colors.forest}
                fontWeight="800"
                textDecoration="none"
                _hover={{ color: colors.rust }}
                _focusVisible={{ outline: `3px solid ${colors.lime}`, outlineOffset: "4px" }}
              >
                <HStack gap="2">
                  <GitBranch size={18} />
                  <Text>All repositories</Text>
                  <ArrowUpRight size={17} />
                </HStack>
              </Link>
            </Flex>

            <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        <Container id="skills" maxW="1180px" px={{ base: "5", md: "8" }} py={{ base: "24", md: "32" }}>
          <SectionLabel>Technical toolkit</SectionLabel>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: "8", md: "16" }} alignItems="end" mb={{ base: "12", md: "16" }}>
            <Heading fontSize={{ base: "4xl", md: "6xl" }} letterSpacing="-0.055em" lineHeight="1">
              The tools behind the work.
            </Heading>
            <Text color={colors.muted} fontSize={{ base: "lg", md: "xl" }} lineHeight="1.7">
              I&apos;m most at home connecting a clean React interface to practical server-side logic and well-structured data.
            </Text>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, sm: 2 }} borderTop="1px solid" borderLeft="1px solid" borderColor={colors.line}>
            {skills.map(({ icon: SkillIcon, title, items }) => (
              <Stack key={title} minH="220px" p={{ base: "6", md: "8" }} gap="9" borderRight="1px solid" borderBottom="1px solid" borderColor={colors.line} bg="rgba(255, 253, 248, .66)">
                <Flex w="11" h="11" align="center" justify="center" borderRadius="xl" bg={colors.forestLight} color={colors.forest}>
                  <SkillIcon size={21} />
                </Flex>
                <Box>
                  <Heading mb="3" fontSize="xl" letterSpacing="-0.03em">
                    {title}
                  </Heading>
                  <Text color={colors.muted} lineHeight="1.7">
                    {items}
                  </Text>
                </Box>
              </Stack>
            ))}
          </SimpleGrid>
        </Container>

        <Box as="section" bg={colors.forest} color="white">
          <Container maxW="1180px" px={{ base: "5", md: "8" }} py={{ base: "24", md: "32" }}>
            <SectionLabel light>Contact</SectionLabel>
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: "10", lg: "20" }} alignItems="end">
              <Heading maxW="720px" fontSize={{ base: "5xl", md: "7xl" }} letterSpacing="-0.06em" lineHeight="0.96">
                Have a useful idea? Let&apos;s make it real.
              </Heading>
              <Stack gap="7" alignItems="start">
                <Text maxW="560px" color="rgba(255,255,255,.72)" fontSize={{ base: "lg", md: "xl" }} lineHeight="1.7">
                  I&apos;m looking for developer opportunities where I can contribute, keep learning, and help build thoughtful, reliable products.
                </Text>
                <Button
                  asChild
                  h="14"
                  px="7"
                  borderRadius="full"
                  bg={colors.lime}
                  color={colors.ink}
                  fontWeight="800"
                  _hover={{ bg: "#e5f7be", transform: "translateY(-2px)" }}
                  _focusVisible={{ outline: "3px solid white", outlineOffset: "4px" }}
                >
                  <a href="mailto:arayamajhi19@gmail.com">
                    <HStack gap="3">
                      <Mail size={18} />
                      <Text>arayamajhi19@gmail.com</Text>
                      <ArrowUpRight size={18} />
                    </HStack>
                  </a>
                </Button>
              </Stack>
            </SimpleGrid>
          </Container>
        </Box>
      </Box>

      <Box as="footer" bg="#24382a" color="rgba(255,255,255,.66)">
        <Container maxW="1180px" px={{ base: "5", md: "8" }} py="8">
          <Flex justify="space-between" align={{ base: "start", md: "center" }} direction={{ base: "column", md: "row" }} gap="5" fontSize="sm">
            <Text>© {new Date().getFullYear()} Abhudaya Rayamajhi</Text>
            <HStack gap="6">
              <Link href="https://github.com/abhuraya" target="_blank" rel="noreferrer" color="inherit" _hover={{ color: "white" }}>
                GitHub
              </Link>
              <Link href="#home" color="inherit" _hover={{ color: "white" }}>
                Back to top ↑
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
