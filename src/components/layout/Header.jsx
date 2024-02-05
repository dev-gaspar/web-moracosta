import {
  HoverCard,
  Group,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Flex,
  Avatar,
  Button,
} from '@mantine/core';
import {
  IconChevronDown, IconChevronLeft, IconChevronRight,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderMegaMenu.module.css';

import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getMarcas, getMarcasStatus, selectAllMarcas } from '../../features/vehiculos/marcasSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getModelos, getModelosStatus, selectAllModelos } from '../../features/vehiculos/modelosSlice';
import { selectAllVehiculos } from '../../features/vehiculos/vehiculosSlice';
import { getVehiculoStatus } from '../../features/vehiculos/vehiculoSlice';

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

  const dispatch = useDispatch()
  const marcas = useSelector(selectAllMarcas)
  const marcasStatus = useSelector(getMarcasStatus)

  const vehiculos = useSelector(selectAllVehiculos)
  const vehiculosStatus = useSelector(getVehiculoStatus)

  useEffect(() => {
    if (marcasStatus === 'idle') {
      dispatch(getMarcas())
    }

    if (vehiculosStatus === 'idle') {
      dispatch(getModelos())
    }
  }, [marcasStatus, vehiculosStatus, dispatch])


  useEffect(() => {
    window.scrollTo(0, 0);
    if (drawerOpened) {
      closeDrawer();
    }
  }, [pathname]);

  const handleClicLogo = () => {
    navigate('/')
  }

  const handleClicVehiculo = (id) => {
    navigate(`/modelos/${id}`)
  }

  const handleClicMarca = (id) => {
    navigate(`/modelos/marca/${id}`)
  }

  let contenido;

  if (vehiculosStatus === 'loading' || marcasStatus === 'loading') {
    contenido = "Cargando..."
  } else if (vehiculosStatus === 'succeeded' || marcasStatus === 'succeeded') {
    contenido = marcas.map((marca) => (
      <UnstyledButton className={classes.subLink} key={marca._id}>
        <Text size="md" fw={500} px={10} py={5} tt="uppercase" className='hover-nav-sub-links' onClick={() => {
          handleClicMarca(marca._id)
        }} >
          {marca.nombre}
        </Text>
        <Flex
          visibleFrom='md'
          px="sm"
          gap="sm"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap" >
          {vehiculos.slice(0, 3).map((vehiculo) => {
            if (vehiculo.modelo.marca._id === marca._id) {
              return (
                <Group wrap="nowrap" key={vehiculo._id} className='w-100' onClick={() => {
                  handleClicVehiculo(vehiculo._id)
                }} >
                  <Avatar
                    src={vehiculo.imagen_principal.url}
                    size={50}
                    radius="md"
                    bg={theme.colors.dark[5]}
                    alt={vehiculo.nombre}
                  />
                  <Text fw={400} size='sm' tt="uppercase" className={classes.name} >
                    {vehiculo.nombre}
                  </Text>
                </Group>
              )
            }
          })}
          <UnstyledButton className='d-flex text-center w-100' ta="center" onClick={() => {
            handleClicMarca(marca._id)
          }}>
            <Text fw={400} size="xs" td="underline" tt="uppercase" className={classes.name} >VER TODOS</Text>
            <IconChevronRight
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.red[9]}
            />
          </UnstyledButton>
        </Flex>
      </UnstyledButton>
    ))
  } else if (vehiculosStatus === 'failed' || marcasStatus === 'failed') {
    contenido = "Error"
  }

  return (
    <Box className='navbar navbar-dark' >
      <header className='container py-sm-3 ' >
        <Group justify="space-between" w="100%" h="100%">
          <img src="/assets/logo-letras.webp" alt="logo" height="30" style={{ cursor: "pointer" }} onClick={() => {
            handleClicLogo()
          }} />

          <Group h="100%" gap={0} visibleFrom="md" className='text-uppercase' >

            <div className='d-flex' >
              <ul className="navbar-nav text-center flex-row">
                <li className="nav-item mx-2">
                  <Link className="nav-link" to={"/"}>Inicio</Link>
                </li>

                <HoverCard position="bottom" radius="md" shadow="md" withinPortal>
                  <HoverCard.Target className="nav-item mx-2 no-border" >
                    <Center inline className={`${classes.link} nav-link`} >
                      <Box component="span" mr={5}>
                        MARCAS
                      </Box>
                      <IconChevronDown
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.red[9]}
                      />
                    </Center>
                  </HoverCard.Target>
                  <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                    <Group justify="space-between" px="md">
                      <Text fw={500}>MARCAS</Text>
                    </Group>

                    <Divider my="sm" />
                    <SimpleGrid cols={marcas ? marcas.length : 1} spacing={0}>
                      {contenido}
                    </SimpleGrid>
                  </HoverCard.Dropdown>
                </HoverCard>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to={"/sucursales"}>Surcursales</Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to={"/cotizador"}>Cotizador</Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to={"/contactanos"}>Contáctanos</Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to={"/nosotros"}>Nosotros</Link>
                </li>
              </ul>
            </div>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" color={theme.colors.gray[5]} />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="MENU"
        hiddenFrom="md"
        zIndex={301}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider />
          <Link to={"/"} className={classes.option} >INICIO</Link>
          <Divider />
          <UnstyledButton className={classes.option} onClick={toggleLinks}>
            <Center inline>
              <Box component="span">
                MARCAS
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.red[9]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>
            {contenido}
          </Collapse>
          <Divider />
          <Link className={classes.option} to={"/sucursales"}>SURCURSALES</Link>
          <Divider />
          <Link className={classes.option} to={"/cotizador"}>COTIZADOR</Link>
          <Divider />
          <Link className={classes.option} to={"/contactanos"}>CONTÁCTANOS</Link>
          <Divider />
          <Link className={classes.option} to={"/nosotros"}>NOSOTROS</Link>
          <Divider />
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default Header